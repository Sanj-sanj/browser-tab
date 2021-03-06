import { useEffect, useState } from "react";

const Weather = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const updateMessage = setTimeout(() => {
      setMessage("Weather information is currently unavailable right now.");
    }, 1000);
    return () => clearTimeout(updateMessage);
  });

  return (
    <div className="border text-xs mt-3 rounded-md border-pop-900 bg-pop-800 p-3">
      <div className="w-full flex justify-between font-medium  ">
        <span>Weather</span>
        <span>Location</span>
      </div>
      <div className="pt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {message}
      </div>
    </div>
  );
};
export default Weather;
