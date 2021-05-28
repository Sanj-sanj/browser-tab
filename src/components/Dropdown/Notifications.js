import Bell from "../svg/Bell";

const Notifications = ({ notifications }) => {
  return (
    <>
      {!notifications ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Bell />
          <span className="mt-4">No notifications</span>
        </div>
      ) : null}
    </>
  );
};
export default Notifications;
