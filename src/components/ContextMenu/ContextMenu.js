const ContextMenu = ({ position, position: { screenRects } }) => {
  console.log(position);
  if (position.x + 192 >= screenRects.width) {
    console.log("flipsides?");
    position.x = position.x - 192;
  }
  if (position.y + 192 >= screenRects.bottom) {
    position.y = position.y - 192;
  }

  return (
    <div //192PX
      className="absolute p-2 w-48 h-48 rounded z-50 bg-gray-700 border border-gray-600 animate-bounce-in"
      style={{ top: position.y - screenRects.y, left: position.x }}
    >
      <ul className="flex flex-col">
        <li>New Folder</li>
        <li>Paste</li>
        <li>Select All</li>
        <li>Show Desktop in files</li>
        <li>Change Background</li>
        <li>Display Settings</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};
export default ContextMenu;
