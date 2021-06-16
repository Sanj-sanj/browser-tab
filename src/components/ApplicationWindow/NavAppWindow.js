const NavAppWindow = ({
  setToggle,
  name,
  thickBar = false,
  toggleFullscreen,
}) => {
  return (
    <>
      <nav className={`relative w-full`} onDoubleClick={toggleFullscreen}>
        {thickBar ? (
          <span className="absolute w-full h-1.5 flex border-t border-gray-600 rounded-t-2xl bg-pop-800" />
        ) : null}
        <div
          className={`w-full flex flex-col rounded-t bg-pop-800 text-center text-sm font-bold text-white ${
            thickBar ? "py-3" : "py-1"
          } ${!name ? "h-11" : ""}`}
        >
          {name}

          <button
            className="exit group absolute right-0 focus:outline-none"
            onClick={() => setToggle(false)}
          >
            <span className="absolute right-3 w-3 h-3 transform translate-y-1 bg-white rounded-2xl "></span>
            <span className="absolute right-2 transition-colors duration-300 text-yellow-600 fill-current hover:text-gray-600 active:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
export default NavAppWindow;
