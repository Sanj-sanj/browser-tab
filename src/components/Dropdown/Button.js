const Button = ({ Component, close, children }) => {
  return (
    <button
      className={`flex w-full justify-between cursor-default focus:outline-none ${
        Component
          ? "focus:bg-gray-700 hover:bg-gray-700 active:bg-yellow-500"
          : "focus:bg-blue-400 hover:bg-blue-400 active:bg-blue-400"
      }`}
      onClick={close}
    >
      {Component ? (
        <div className="w-full flex px-7 py-1 relative items-center">
          <span className="mr-2">
            <Component />
          </span>
          <span className="text-sm">{children}</span>
        </div>
      ) : (
        <span className="p-1 pl-7 text-sm">{children}</span>
      )}
    </button>
  );
};
export default Button;
