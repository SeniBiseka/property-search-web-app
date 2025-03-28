import React from "react";
import { Carousel } from "react-bootstrap";

function PropertyPage({ property }) {
  return (
    <div>
      <h2>{property.type} - £{property.price}</h2>
      <p>{property.location}</p>
      <div>
        <Carousel>
          {property.pictures.map((picture, index) => (
            <Carousel.Item key={index}>
              <img src={`/${picture}`} alt={`Property Image ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyPage;
