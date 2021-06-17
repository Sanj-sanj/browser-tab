import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import Dropdown from "../components/Dropdown/Dropdown";
import Range from "../components/Dropdown/Range";
import Selections from "../components/Dropdown/Selections";
import Button from "../components/Dropdown/Button";

import Setting from "../components/svg/Setting";
import Volume from "../components/svg/Volume";
import Wifi from "../components/svg/Wifi";
import Battery from "../components/svg/Battery";
import Display from "../components/svg/Display";
import Power from "../components/svg/Power";
import CalendarBar from "../components/Dropdown/CalendarBar";
import Notifications from "../components/Dropdown/Notifications";

import { openSettings, toggleWifi } from "../js/dispatch";
import Rename from "../components/Dropdown/Rename";

const useMenu = (clearAndUnfocusMenu) => {
  const [menu, setMenu] = useState(null);
  const { state, dispatch } = useContext(UserContext);

  function getRects(currentTarget) {
    return currentTarget.getBoundingClientRect();
  }
  function makeMenu(currentTarget, caller, clickHandler) {
    // console.log(currentTarget, caller, clickHandler);
    switch (caller) {
      case "middle":
        setMenu(
          <Dropdown rects={getRects(currentTarget)} caller={caller}>
            <div className="flex flex-col w-full p-2 lg:flex-row items-center">
              <section className="flex-1 w-1/2">
                <Notifications />
              </section>
              <section className="flex justify-center flex-1 w-full md:w-4/5 border-l border-transparent lg:border-pop-900 lg:max-w-max">
                <CalendarBar />
              </section>
            </div>
          </Dropdown>
        );
        break;
      case "right":
        setMenu(
          <Dropdown rects={getRects(currentTarget)} caller={caller}>
            {" "}
            <Range
              Component={Volume}
              label={"Volume"}
              dispatch={dispatch}
              defaultValue={state.volume}
              max={"100"}
            />
            <Range
              Component={Display}
              label={"Display"}
              dispatch={dispatch}
              defaultValue={state.display}
              max={"10"}
            />
            <div className="py-3 px-16 ">
              <hr className="w-full border-pop-900" />
            </div>
            <Selections
              Component={Wifi}
              label="Wifi"
              state={state.wifi}
              _onClick={() => (
                toggleWifi(dispatch, state.wifi), clearAndUnfocusMenu()
              )}
            >
              {[`Turn Wifi ${state.wifi ? "Off" : "On"}`]}
            </Selections>
            <Selections
              Component={Battery}
              label="Battery"
              _onClick={clearAndUnfocusMenu}
            >
              {["Something battery."]}
            </Selections>
            <span className="py-2 px-16 ">
              <hr className="w-full border-pop-900" />
            </span>
            <Button
              Component={Setting}
              close={clearAndUnfocusMenu}
              _onClick={() => openSettings(dispatch)}
            >
              Settings
            </Button>
            <Button
              Component={Setting}
              close={clearAndUnfocusMenu}
              _onClick={() => {
                dispatch({
                  type: "updateActiveView",
                  payload: "Lock",
                });
              }}
            >
              Lock
            </Button>
            <Selections
              Component={Power}
              label="Power"
              _onClick={clearAndUnfocusMenu}
              close={clearAndUnfocusMenu}
            >
              {["Logout", "Poweroff?"]}
            </Selections>
          </Dropdown>
        );
        break;
      case "rename":
        setMenu(
          <Dropdown rects={currentTarget} caller={caller}>
            <Rename clickHandler={clickHandler} close={clearAndUnfocusMenu} />
          </Dropdown>
        );
        break;
      case "file system":
        setMenu(
          <Dropdown rects={getRects(currentTarget)} caller={caller}>
            <div className="px-3">
              <Button close={clearAndUnfocusMenu} _onClick={clickHandler}>
                New Folder
              </Button>
            </div>
          </Dropdown>
        );
        break;
      default:
        setMenu(null);
        break;
    }
  }
  return [menu, makeMenu];
};
export default useMenu;
