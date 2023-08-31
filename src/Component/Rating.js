import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ value, maxValue }) => {
    const stars = [];
  
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;
  
    for (let i = 1; i <= maxValue; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ opacity: 0.5 }} />);
      }
    }
  
    return <div>{stars}</div>;
  };
  
  export default Rating;