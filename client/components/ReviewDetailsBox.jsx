import React from 'react';
import ReviewDetailsWrapper from '../styles/ReviewDetails.style.js';

const createLongDate = function (datetime) {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(datetime.toLocaleString().split('T')[0]);
  return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const ReviewDetailsBox = props => (
  <ReviewDetailsWrapper>
    <div className="review-details-box">
      <span className="created-at"> {createLongDate(props.review.created_at)} </span>
      <div className="title"> {props.review.title} </div>
      <div className="details"> {props.review.details} </div>
    </div>
  </ReviewDetailsWrapper>
);

export default ReviewDetailsBox;
