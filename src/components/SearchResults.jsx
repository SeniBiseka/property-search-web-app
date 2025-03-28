import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import PropertyDetails from "./PropertyDetails";

function SearchResults({ results, handleAddToFavourites }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Function to handle the "View Details" button
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  // Function to close the property details view
  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div>
      {selectedProperty ? (
        <PropertyDetails property={selectedProperty} onClose={handleCloseDetails} />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {results.length > 0 ? (
            results.map((property, index) => (
              <Draggable key={property.id} draggableId={property.id} index={index}>
                {(provided) => (
                  <Col
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card className="custom-card">
                      <Card.Img variant="top" src={property.picture} alt={property.type} />
                      <Card.Body>
                        <Card.Title>{property.type}</Card.Title>
                        <Card.Text>
                          Location: {property.location}
                          <br />
                          Price: £{property.price}
                        </Card.Text>
                        <a
                          href="#"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewDetails(property);
                          }}
                        >
                          View Details
                        </a>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleAddToFavourites(property)}
                        >
                          Save to Favourites
                        </button>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Draggable>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </Row>
      )}
    </div>
  );
}

export default SearchResults;
