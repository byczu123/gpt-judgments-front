import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import Navbar from "../component/Navbar";
import {toast, ToastContainer} from "react-toastify";
import {navigate} from "use-history";

function JustificationPage() {
  const [justification, setJustification] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const location = useLocation();

  useEffect(() => {
      setJustification(location.state.justification)
  }, [location.state.justification]);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (event) => {
  setRating(parseInt(event.target.value));
    };

    const handleRateButtonClick = () => {
        if(isNaN(rating) || rating === 0){
            toast.error("Invalid rating.",{
                position: "bottom-center",
                toastId: 'invalid-rating-toast'});
        }
    const data = {
      justification: justification,
      rating: rating,
      feedback: feedback,
    };
    fetch('http://localhost:5000/gpt/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
          if (response.ok) {
              navigate('/gpt-judgments-front/');
          } else {
              toast.error("Token is invalid.",{
                position: "bottom-center",
                toastId: 'invalid-token-toast'});
          }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="default">
        <Navbar/>
        <h1 className="title">Generated justification:</h1>
        <div className="default-row">
            <div className="center_text">
                <div dangerouslySetInnerHTML={{__html:justification}}/>
            </div>
            <div className="center_rate">
                        <div className="box">
            <div className="rating">
                <input type="radio" name="star" id="10" value="10" onChange={handleRatingChange}/><label htmlFor="10">10</label>
                <input type="radio" name="star" id="9" value="9" onChange={handleRatingChange}/><label htmlFor="9">9</label>
                <input type="radio" name="star" id="8" value="8" onChange={handleRatingChange}/><label htmlFor="8">8</label>
                <input type="radio" name="star" id="7" value="7" onChange={handleRatingChange}/><label htmlFor="7">7</label>
                <input type="radio" name="star" id="6" value="6" onChange={handleRatingChange}/><label htmlFor="6">6</label>
                <input type="radio" name="star" id="5" value="5" onChange={handleRatingChange}/><label htmlFor="5">5</label>
                <input type="radio" name="star" id="4" value="4" onChange={handleRatingChange}/><label htmlFor="4">4</label>
                <input type="radio" name="star" id="3" value="3" onChange={handleRatingChange}/><label htmlFor="3">3</label>
                <input type="radio" name="star" id="2" value="2" onChange={handleRatingChange}/><label htmlFor="2">2</label>
                <input type="radio" name="star" id="1" value="1" onChange={handleRatingChange}/><label htmlFor="1">1</label>
            </div>
        </div>
                <textarea className="text-input" placeholder="Here you can leave some feedback" value={feedback} onChange={handleFeedbackChange}/>
                <button className={'rate-button query_button'} type="button" onClick={handleRateButtonClick}>
                    Rate result
                </button>
            </div>
             <ToastContainer/>
        </div>
    </div>
  );
}

export default JustificationPage;
