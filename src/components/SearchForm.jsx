import React, { useState } from "react";
import propertiesData from "../data/properties.json";
import SearchResults from "./SearchResults";
import { Form, Button } from "react-bootstrap";
import FavouritesList from "./FavouritesList"; // Import the FavouritesList component
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function SearchForm() {
    const [type, setType] = useState("any");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBedrooms, setMinBedrooms] = useState("");
    const [maxBedrooms, setMaxBedrooms] = useState("");
    const [postcode, setPostcode] = useState("");
    const [dateAdded, setDateAdded] = useState("");
    const [results, setResults] = useState([]);
    const [favourites, setFavourites] = useState([]); //state to track the favourite properties
  
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        
        const filteredProperties = propertiesData.properties.filter((property) => {
            const propertyDate = new Date(
                `${property.added.year}-${property.added.month}-${property.added.day}`
            );
            const userDate = new Date(dateAdded);
            
            return (
                (type === "any" || property.type === type) &&
                (!minPrice || property.price >= parseInt(minPrice)) &&
                (!maxPrice || property.price <= parseInt(maxPrice)) &&
                (!minBedrooms || property.bedrooms >= parseInt(minBedrooms)) &&
                (!maxBedrooms || property.bedrooms <= parseInt(maxBedrooms)) &&
                (!postcode || property.location.toLowerCase().includes(postcode.toLowerCase())) &&
                (!dateAdded || propertyDate >= userDate)
            );
        });
        
        setResults(filteredProperties);  // Update results state
    };

    // Handle adding to favourites
//    const handleAddToFavourites = (property) => {
//        if (!favourites.find((fav) => fav.id === property.id)) {
//          setFavourites([...favourites, property]);
//        }
//    }; 
      

      // Handle adding favourites by dragging
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.droppableId === "favourites") {
      const draggedProperty = results[result.source.index];
      if (!favourites.find((fav) => fav.id === draggedProperty.id)) {
        setFavourites([...favourites, draggedProperty]);
      }
    }
  };

  //function to remove an item from fav list
  const handleRemoveFromFavourites = (propertyId) => {
    setFavourites(favourites.filter((fav) => fav.id !== propertyId));
  };

  // Function to clear all items from favourites
  const handleClearAll = () => {
    setFavourites([]);  // Set favourites to an empty array
  };

        return (
            <DragDropContext onDragEnd={handleDragEnd}>
            <div>
            <h2>Search Properties</h2>
            <form onSubmit={handleSubmit}>
                
                {/* Property Type */}
                <Form.Group controlId="propertyType">
                    <Form.Label>Type</Form.Label>
                    <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="any">Any</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                    </Form.Select>
                </Form.Group>

                {/* Price Range */}
                <Form.Group controlId="minPrice">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control
                     type="number"
                     placeholder="Min Price"
                     value={minPrice}
                     onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="maxPrice">
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control
                     type="number"
                     placeholder="Max Price"
                     value={maxPrice}
                     onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Form.Group>
                
                {/* Bedrooms */}
                <Form.Group controlId="minBedrooms">
                    <Form.Label>Min Bedrooms</Form.Label>
                    <Form.Control
                     type="number"
                     placeholder="Min Bedrooms"
                     value={minBedrooms}
                     onChange={(e) => setMinBedrooms(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="maxBedrooms">
                    <Form.Label>Max Bedrooms</Form.Label>
                    <Form.Control
                     type="number"
                     placeholder="Max Bedrooms"
                     value={maxBedrooms}
                     onChange={(e) => setMaxBedrooms(e.target.value)}
                    />
                </Form.Group>

                {/* Postcode */}
                <Form.Group controlId="postcode">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                     type="text"
                     placeholder="e.g., NW1"
                     value={postcode}
                     onChange={(e) => setPostcode(e.target.value)}
                    />
                </Form.Group>

                {/* Date Added */}
                <Form.Group controlId="dateAdded">
                    <Form.Label>Date Added</Form.Label>
                    <Form.Control
                     type="date"
                     value={dateAdded}
                     onChange={(e) => setDateAdded(e.target.value)}
                    />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </form>

                <Droppable droppableId="results">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <SearchResults
                results={results}
                handleAddToFavourites={(property) => {
                  if (!favourites.find((fav) => fav.id === property.id)) {
                    setFavourites([...favourites, property]);
                  }
                }}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="favourites">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
            >
              <FavouritesList 
  favourites={favourites} 
  handleRemoveFromFavourites={handleRemoveFromFavourites} 
  handleClearAll={handleClearAll} // Pass the clear all function
/>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
    
export default SearchForm;