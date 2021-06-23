import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import NavAppWindow from "./NavAppWindow";
import {
  cdOpenApp,
  mkdir as mkdirDispatch,
  openFiles,
} from "../../js/dispatch";

const TerminalApp = ({
  state,
  state: { apps, dirs, isFocused },
  dispatch,
  id,
  toggle,
  setToggle,
  setFocus,
  clearDesktopMenu,
  whichDir,
  name,
}) => {
  const currentOpenApp = apps.find((app) => app.id === id);
  const [currentDir, setCurrentDir] = useState(currentOpenApp.dir);
  const [fullscreen, setFullscreen] = useState(false);
  const terminal = useTerminal(
    state,
    dispatch,
    getNestedDirs(),
    currentDir,
    setToggle,
    id
  );
  // const [folder, [path]] = getNestedDirs();

  useEffect(() => {
    setCurrentDir(currentOpenApp.dir);
  });

  function getNestedDirs() {
    if (currentDir.includes("/")) {
      const dirsArray = currentDir.split("/");
      const howDeep = dirsArray.length;
      let start = dirs[dirsArray[0]];
      for (let i = 1; i < howDeep; i++) {
        try {
          start = start.find((item) => item[dirsArray[i]])[dirsArray[i]];
        } catch (err) {
          //resets the state.app.dir val when folder is open and renamed while open in the same dir
          cdOpenApp(dispatch, id, dirsArray[0]);
        }
      }
      return [start, [dirsArray]];
    }
    return [dirs[currentDir], [currentDir]];
  }

  return (
    <Draggable
      bounds={"parent"}
      cancel=".exit, button"
      defaultClassName={`${
        toggle ? "animate-pop-out-inside " : "animate-fade-out"
      }`}
      position={fullscreen ? { x: 0, y: 0 } : null}
    >
      <section
        className={`fsApp bg-pop-800 border h-96 sm:h-132 border-pop-900 flex flex-col w-3/4 sm:w-176 shadow-2xl overflow-hidden transition-h-w z-20 rounded-t-md`}
        style={{
          width: fullscreen ? "100%" : " ",
          height: fullscreen ? "100%" : " ",
          minWidth: fullscreen ? "" : "20rem",
          minHeight: fullscreen ? "" : "15rem",
          zIndex: isFocused.id === id ? "30" : "20",
        }}
        role="presentation"
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onClick={(e) => {
          e.stopPropagation();
          clearDesktopMenu();
          setFocus(id);
        }}
      >
        <NavAppWindow
          setToggle={setToggle}
          toggleFullscreen={() => setFullscreen(!fullscreen)}
          thickBar={true}
          name={name}
        />
        <div className="terminalApp overflow-y-scroll h-full p-0.5">
          {terminal}
        </div>
      </section>
    </Draggable>
  );
};

const previousCommandJsx = (ps2, path, result, input) => {
  return (
    <>
      <div className="relative w-full flex">
        <div className="w-auto flex min-w-max font-semibold">
          {/* //name@station: this dir $ */}
          <span className="text-green-500">{ps2} </span>
          <span className="text-white mx-0.5">:</span>
          <span className="text-blue-500">~/{path === "home" ? "" : path}</span>

          <span className="text-white">$ </span>
          <span className="ml-1 text-white font-normal">{input}</span>
        </div>
      </div>
      <div className="w-full relative text-white">
        <span>{result}</span>
      </div>
    </>
  );
};

const useTerminal = (
  state,
  dispatch,
  [folder, [path]],
  currentDir,
  exitFunc,
  id
) => {
  // console.log({ state.user, folder, path, exitFunc, currentDir });
  let ps2 = `${state.user}@pop-os`;
  console.log("1", folder, path);

  const [userCommand, setUserCommand] = useState("");
  const [commandResult, setCommandResult] = useState("");
  const [previousResults, setPreviousResults] = useState([]);

  useEffect(() => {
    currentDir === "home" ? (folder = state.dirs) : folder;
  });

  useEffect(() => {
    const viewport = document.querySelector(".terminalApp");
    let focusInput = setTimeout(() => {
      document.querySelector(".terminalInput").focus();
    }, 100);
    if (viewport) {
      viewport.scroll(0, 9999999);
    }
    if (commandResult) {
      setPreviousResults([
        ...previousResults,
        previousCommandJsx(ps2, currentDir, commandResult, userCommand),
      ]);
      setCommandResult("");
      setUserCommand("");
    }
    return () => clearTimeout(focusInput);
  }, [commandResult]);

  const changeDir = (dir) => {
    if (path === "home" && state.dirs[dir]) {
      //user is in root home directory
      state.apps[dir];
      setCommandResult(true);
      return cdOpenApp(dispatch, id, dir);
    }
    if (!dir || dir === "/" || dir === "~") {
      setCommandResult(true);
      cdOpenApp(dispatch, id, "home");
      return;
    }
    if (Array.isArray(folder)) {
      if (Array.isArray(path)) {
        //for nested futher than three onwards
        const start = path.shift();
        let searchedFolder;
        for (let i = 0; i < path.length; i++) {
          searchedFolder = folder.find((directory) => directory[dir]);
        }
        console.log("here");
        console.log(searchedFolder);
        console.log("here", currentDir);
        console.log("here", path);
        if (searchedFolder[dir]) {
          cdOpenApp(dispatch, id, `${currentDir}/${dir}`);
          setCommandResult("I forbid you from going deeper than this");
        }
      }
      let searchedFolder = folder.find((directory) => directory[dir]);
      if (searchedFolder) {
        cdOpenApp(dispatch, id, `${currentDir}/${dir}`);
        setCommandResult(true);
        return;
      }
    }
    setCommandResult(`bash: cd: ${dir}: no such file or directory`);
    return;
  };
  const mkdir = (params) => {
    if (Array.isArray(path) && path.length >= 3) {
      return setCommandResult("I forbid there be anymore files here");
    }
    const handleMakeDir = (newDir) => {
      const onDoubleClick = () =>
        openFiles(dispatch, `${currentDir}/${newDir.replace(/\//g, "_")}`);
      mkdirDispatch(
        dispatch,
        newDir.replace(/\//g, "_"),
        currentDir,
        onDoubleClick
      );
    };

    if (!Array.isArray(folder)) {
      console.log("in home dir");
      setCommandResult(
        "W: permission denied, you will be reported to the appropriate authorities"
      );
      return;
    }
    handleMakeDir(params);
    setCommandResult(true);
  };

  const listDirs = () => {
    const dirs = [];
    if (currentDir === "home") {
      //inside root
      for (let dir in folder) {
        dirs.push(`"${dir.slice(0, 1).toUpperCase() + dir.slice(1)}"`);
      }
      setCommandResult(dirs.join(", "));
      return dirs;
    }
    if (Array.isArray(folder)) {
      const files = folder.filter((file) => (file.title ? file.title : null));
      dirs.push(files.map((file) => file.title));
      setCommandResult(files.map((file) => file.title).join(", "));
      return dirs;
    }
    setCommandResult(true);
  };

  const undefinedCommand = (command) => {
    setCommandResult(`${command ? `${command}: command not found` : ""} `);
  };
  const whoAmI = () => {
    setCommandResult(state.user);
  };
  const echo = (param = " ") => {
    setCommandResult(param);
  };
  const exit = () => exitFunc();
  const log = () => {
    console.log(folder, path);
    setCommandResult("check console");
  };

  const help = () => {
    const allCommands = [];
    for (let cmd in commands) {
      allCommands.push(cmd);
    }
    setCommandResult(
      `Type help to see this list. These commands are defined internally. Available commands are: ${allCommands.join(
        ", "
      )}`
    );
    return;
  };

  /* -------------------------------------------------------- */

  function handleCommand(command) {
    setUserCommand(command);
    const cmds = command.split(" ");
    const cmd = cmds[0];
    const params = cmds.splice(1).join(" ");
    if (params) {
      commands[cmd] ? commands[cmd](params) : undefinedCommand(command);
      return; // set
    }
    commands[cmd] ? commands[cmd]() : undefinedCommand(command);
  }
  const commands = {
    log,
    whoami: whoAmI,
    echo: echo,
    ls: listDirs,
    mkdir: mkdir,
    cd: (whatDir) => changeDir(whatDir),
    exit: exit,
    help: help,
  };
  return (
    <>
      {/* {console.log("body", previousResults)} */}
      {previousResults.length
        ? previousResults.map((jsx, i) => <div key={i}>{jsx}</div>)
        : null}
      <div className="terminalView relative w-full flex">
        <div className="w-auto flex min-w-max font-semibold">
          {/* //name@station: this dir $ */}
          <span className="text-green-500">{ps2} </span>
          <span className="text-white mx-0.5">:</span>
          <span className="text-blue-500">
            ~/{currentDir === "home" ? "" : currentDir}
          </span>
          <span className="text-white">$</span>
        </div>
        <input
          className="terminalInput focus:outline-none bg-transparent w-full ml-1 text-white"
          onKeyDown={(e) => {
            e.key === "Enter"
              ? (handleCommand(e.target.value), (e.target.value = ""))
              : null;
          }}
        />
      </div>
    </>
  );
};

export default TerminalApp;
