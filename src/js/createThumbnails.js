  function createThumbnails(dispatch,backgrounds) {
    const gallery = [];
    for (const name in backgrounds) {
      let thumbnail = (
        <button
          key={name}
          onClick={() =>
            dispatch({
              type: "changeBackground",
              payload: name,
            })
          }
          className="w-36"
        >
          <img
            src={[backgrounds[name]]}
            alt={`Thumbnail of the ${name} wallpaper`}
          />
        </button>
      );
      gallery.push(thumbnail);
    }
    return gallery;
  }
export default createThumbnails
