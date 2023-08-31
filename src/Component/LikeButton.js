import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import axios from 'axios';

const LikeButton = ({ attractionId, userToken }) => {
    const [isLiked, setIsLiked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchLikedAttractions = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/likes`, {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          });
  
          const likedAttractionIds = response.data;
          setIsLiked(likedAttractionIds.includes(attractionId) || localStorage.getItem(`attraction_${attractionId}_liked`) === 'true');
        } catch (error) {
          console.error('Error fetching liked attractions:', error);
        }
      };
  
      fetchLikedAttractions();
    }, [attractionId, userToken]);
    
  
    const handleToggleLike = async () => {
      if (isLoading) {
        return;
      }
  
      setIsLoading(true);
  
      try {
        if (isLiked) {
          await axios.delete(`http://localhost:8000/api/unlike/${attractionId}`, {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          });
        } else {
          await axios.post(`http://localhost:8000/api/like/${attractionId}`, null, {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          });
        }
  
        const newLikedStatus = !isLiked;
        setIsLiked(newLikedStatus);
        localStorage.setItem(`attraction_${attractionId}_liked`, newLikedStatus.toString()); // Set local storage here
      } catch (error) {
        console.error('Error toggling like:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <button className={`btn btn-outline-danger btn-sm btnlike text-capitalize rounded-9 ${isLiked ? 'liked' : ''}`} onClick={handleToggleLike}>
      <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>  {isLoading ? '...' : (isLiked ? 'Suka' : 'Suka')}
        
      </button>
    );
  };

  export default LikeButton