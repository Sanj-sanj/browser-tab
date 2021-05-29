import { useState } from "react";
import search from "../../js/search";
const SearchBar = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex justify-center w-full ">
      <div className="flex items-center w-auto relative">
        <input
          className="px-5 py-3  rounded-3xl"
          type="text"
          placeholder="Search!"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" ? search(text) : null;
          }}
        />
        <button
          className="absolute right-0 focus:outline-none"
          onClick={() => search(text)}
        >
          <span
            className=" text-2xl pr-5 pl-3"
            role="img"
            aria-label="search icon"
          >
            🔍️
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
