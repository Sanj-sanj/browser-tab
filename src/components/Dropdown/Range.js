import { useState } from "react";

const Range = ({ Component, label, max, defaultValue, dispatch }) => {
  // need this state to keep <Component> updated
  const [currentValue, setCurrentValue] = useState(defaultValue);
  return (
    <div className="flex justify-between items-center w-full px-7 py-2 hover:bg-gray-700">
      <label className="pr-2" htmlFor={label}>
        {" "}
        {/* need icon and set width */}
        <Component value={currentValue} theme={null} />
      </label>
      <input
        className="w-full appearance-none h-2 bg-gray-900 rounded-md"
        type="range"
        htmlFor={label}
        defaultValue={defaultValue}
        min="0"
        max={max}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          dispatch({ type: `update${label}`, payload: e.target.value });
        }}
      />
    </div>
  );
};
export default Range;
