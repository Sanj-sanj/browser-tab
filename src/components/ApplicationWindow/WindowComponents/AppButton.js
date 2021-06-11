const AppButton = ({ Icon, onClick, active, children }) => {
  return (
    <button
      className={`flex w-full py-1.5 text-gray-300 justify-between items-center cursor-default ${
        typeof active === "function" && active(children) ? "bg-blue-400" : ""
      } focus:outline-none focus:bg-blue-400 hover:bg-gray-600 active:bg-blue-400`}
      onClick={() => onClick(children.toLowerCase())}
    >
      <div className="w-full flex pl-7 py-1 relative items-center">
        <span className="mr-2">{Icon ? <Icon /> : null}</span>
        <span className="text-sm">{children}</span>
      </div>
    </button>
  );
};
export default AppButton;
