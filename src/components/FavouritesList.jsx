import React from "react";

function FavouritesList({ favourites, handleRemoveFromFavourites }) {
return (
    <div>
        <h3>Favourite Properties</h3>
        <button type="button" class="btn btn-dark" onClick={() => {
    console.log('Clear All button clicked');
    handleClearAll();
}}>
    Clear All
</button>

        <div>
        {favourites.length > 0 ? (
            favourites.map((property) => (
                <div key={property.id}>
                    <h4>{property.type}</h4>
                    <p>{property.location}</p>
                    <p>Price: £{property.price}</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromFavourites(property.id)}
                    >
                        Delete
                    </button>
                </div>
            ))
        ) : (
            <p>No favourites added yet.</p>
        )}
        </div>
    </div>
);
}

export default FavouritesList;
