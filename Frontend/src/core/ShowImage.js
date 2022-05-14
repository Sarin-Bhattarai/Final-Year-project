import React from "react";

const URL = "http://localhost:8000/";

const ShowImage = ({ item, url }) => {
  console.log(item);
  return (
    <div className="product-img">
      <img
        src={`${URL}${item.photo}`}
        //for test
        // src="https://media-cdn.tripadvisor.com/media/photo-o/0e/af/c8/41/in.jpg"
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
};

export default ShowImage;
