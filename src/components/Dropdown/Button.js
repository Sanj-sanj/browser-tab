const Button = ({ Component }) => {
  return (
    <button className="flex justify-between px-4 py-1 hover:bg-gray-700 ">
      <div className="w-full flex items-center">
        <span className="mr-2">
          <Component />
        </span>
        <span>Settings</span>
      </div>
    </button>
  );
};
export default Button;
