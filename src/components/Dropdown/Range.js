import { useState } from "react";

const Range = ({ Component, label, max }) => {
  const [value, setValue] = useState(50);

  return (
    <div className="flex justify-between w-full px-4 py-1 hover:bg-gray-700 ">
      <label className="pr-2" htmlFor={label}>
        {" "}
        {/* need icon and set width */}
        <Component value={value} theme={null} />
      </label>
      <input
        className="w-full"
        type="range"
        htmlFor={label}
        defaultValue={max / 2}
        min="0"
        max={max}
        onChange={(e) => {
          setValue(e.target.valueAsNumber);
        }}
      />
    </div>
  );
};
export default Range;
