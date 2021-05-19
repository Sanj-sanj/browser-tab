const Button = ({ Component }) => {
  return (
    <div className="flex justify-between px-4 py-1 hover:bg-gray-700 ">
      <div className="w-full flex items-center">
        <span className="mr-2">
          <Component />
        </span>
        <span>Settings</span>
      </div>
    </div>
  );
};
export default Button;
