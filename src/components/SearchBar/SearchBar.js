import { useState } from "react";
import search from "../../js/search";
const SearchBar = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex justify-center w-full group">
      <div
        className="flex items-center w-82 relative "
        style={{ width: "21rem" }}
      >
        <button
          className="absolute left-3 py-1.5 text-gray-400 focus:outline-none group-hover:text-white"
          onClick={() => search(text)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <input
          className="px-5 py-1.5 pl-9 bg-gray-700 w-full rounded-3xl text-sm "
          type="text"
          placeholder="Type to search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" ? search(text) : null;
          }}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
