const IframeApp = ({ name, file, wifi }) => {
  return (
    <>
      {wifi ? (
        <iframe
          sandbox="allow-scripts"
          src={file}
          title={name}
          width="644"
          height="525"
          onLoad={(e) => {
            e.target.focus();
          }}
        />
      ) : (
        <div className="flex flex-col justify-center items-center text-center w-96 h-56 p-4">
          {" "}
          <p>Wifi is not connected!</p>
          Please turn on the Wifi to connect to the internet.{" "}
        </div>
      )}
    </>
  );
};
export default IframeApp;
