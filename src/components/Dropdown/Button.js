const Button = ({ Component, close }) => {
  return (
    <button
      className="flex w-100 justify-between cursor-default focus:outline-none focus:bg-gray-700 active:bg-yellow-500 hover:bg-gray-700"
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
