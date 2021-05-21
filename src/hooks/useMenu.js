import { useState } from "react";
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

const useMenu = (clearAndUnfocusMenu) => {
  const [menu, setMenu] = useState(null);

  function getRects(currentTarget) {
    return currentTarget.getBoundingClientRect();
  }

  function makeMenu(currentTarget, caller) {
    switch (caller) {
      case "middle":
        setMenu(
          <Dropdown rects={getRects(currentTarget)} caller={caller}>
            <Button Component={Setting} close={clearAndUnfocusMenu} />
          </Dropdown>
        );
        break;
      case "right":
        setMenu(
          <Dropdown rects={getRects(currentTarget)} caller={caller}>
            {" "}
            <Range Component={Volume} label={"volume"} max={"100"} />
            <Range Component={Display} label={"display"} max={"10"} />
            <div className="py-3 px-16 ">
              <hr className="w-full border-gray-900" />
            </div>
            <Selections
              Component={Wifi}
              label="Wifi"
              close={clearAndUnfocusMenu}
            />
            <Selections
              Component={Battery}
              label="Battery"
              close={clearAndUnfocusMenu}
            />
            <span className="py-2 px-16 ">
              <hr className="w-full border-gray-900" />
            </span>
            <Button Component={Setting} close={clearAndUnfocusMenu} />
            <Selections
              Component={Power}
              label="Power"
              close={clearAndUnfocusMenu}
            />
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
