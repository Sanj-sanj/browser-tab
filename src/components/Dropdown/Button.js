const Button = ({ Component, close }) => {
  return (
    <button
      className="flex justify-between cursor-default focus:outline-none focus:bg-gray-700 active:bg-yellow-600 focus:active:bg-yellow-600 hover:bg-gray-700"
      onClick={close}
    >
      <div className="w-full flex px-7 py-1 relative items-center">
        <span className="mr-2">
          <Component />
        </span>
        <span className="text-sm">Settings</span>
      </div>
    </button>
  );
};
export default Button;
