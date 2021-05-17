import { useState } from "react";
import search from "../../js/search";
const SearchBar = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex relative items-center w-full sm:w-3/4 md:w-2/5 ">
      <input
        className="px-5 py-3 w-full rounded-3xl"
        type="text"
        placeholder="Search!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          e.key === "Enter" ? search(text) : null;
        }}
        autoFocus={true} //eslint-disable-line
      />
      <button className="absolute right-0" onClick={() => search(text)}>
        <span
          className=" text-2xl pr-5 pl-3"
          role="img"
          aria-label="search icon"
        >
          🔍️
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
