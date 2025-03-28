import React, { useState } from "react";

function PropertyDetails({ property, onClose }) {
    const [currentImage, setCurrentImage] = useState(`/${property.picture}`);
  
    return (
      <div className="property-details">
        <button onClick={onClose} className="btn btn-danger">X</button>
        <h2>{property.type}</h2>
        <p>Price: £{property.price}</p>
        <p>Location: {property.location}</p>
        <img src={currentImage} alt={property.type} className="large-image" />
        <div className="thumbnail-gallery">
          {property.additionalImages.map((img, index) => (
            <img
              key={index}
              src={`/${img}`}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => setCurrentImage(`/${img}`)}
            />
          ))}
        </div>
      </div>
    );
  }
  

export default PropertyDetails;