const AppButton = ({ Icon, onClick, isActive, children }) => {
  return (
    <button
      className={`flex w-full py-1.5 text-gray-300 justify-between items-center cursor-default ${
        typeof isActive === "function" && isActive(children)
          ? "bg-blue-400"
          : ""
      } focus:outline-none focus:bg-blue-400 hover:bg-pop-700 active:bg-blue-400`}
      onClick={() => onClick(children.toLowerCase())}
    >
      <div className="w-full flex px-2 sm:pl-4 py-1 relative items-center">
        <span className="mr-2">{Icon ? <Icon /> : null}</span>
        <span className="text-sm">{children}</span>
      </div>
    </button>
  );
};
export default AppButton;
