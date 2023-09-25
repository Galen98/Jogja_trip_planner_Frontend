import React from 'react';


function Itinerary(props) {
  const { places } = props;


 
  return (
    <div className="itinerary">
      {places.map((place, index) => (
        <div key={index}>
          <span className="dot"></span>
          <span className="place-name">{place.name}</span>
          {index < places.length - 1 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
}

export default Itinerary;