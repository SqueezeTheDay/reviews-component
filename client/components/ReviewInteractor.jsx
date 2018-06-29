import React from 'react';
import axios from 'axios';
import ReviewInteractorWrapper from '../styles/ReviewInteractor.style.js';

// axios.defaults.baseURL = '/reviews-module';

class ReviewInteractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votedHelpful: this.props.review.voted_helpful,
      votedNotHelpful: this.props.review.voted_not_helpful,
      inappropriate: this.props.review.inappropriate,
      id: this.props.review.reviewid,
      leftFeedback: null,
    };
    this.updateReview = this.updateReview.bind(this);
  }

  updateReview(e) {
    const { className: field } = e.target;
    const { leftFeedback } = this.state;
    console.log('you clicked on ', field);
    console.log('id: ', this.state.id);
    console.log('value: ', this.state[field] + 1);
    if (!leftFeedback) {
      axios.put('/reviews', {
        reviewId: this.state.id,
        field: field,
        value: this.state[field] + 1,
      })
        .then(() => {
          console.log('You’ve successfully left feedback on this review!');
          this.setState(prevState => (
            {
              [field]: prevState[field] + 1,
              leftFeedback: field,
            }
          ));
        });
    }
    if (leftFeedback === field) {
      axios.put('/reviews', {
        reviewId: this.state.id,
        field: field,
        value: this.state[field] - 1,
      })
        .then(() => {
          console.log('You’ve successfully reversed your feedback on this review');
          this.setState(prevState => (
            {
              [field]: prevState[field] - 1,
              leftFeedback: null,
            }
          ));
        });
    }
  }
  render() {
    const { votedHelpful, votedNotHelpful } = this.state;
    return (
      <ReviewInteractorWrapper>
      <div className="review-interactor">
        <span className="review-interactor-prefix">Was this review helpful to you?</span>
        <span className="thumbs-up">
          <span className="votedHelpful" onClick={this.updateReview}>Yes</span>
          {' ( '}
          <span>{votedHelpful}</span>
          {' ) '}
        </span>
        <span className="thumbs-down">
          <span className="votedNotHelpful" onClick={this.updateReview}>No</span>
          {' ( '}
          <span>{votedNotHelpful}</span>
          {' ) '}
        </span>
        <span className="inappropriate" onClick={this.updateReview}>Report as inappropriate</span>
      </div>
      </ReviewInteractorWrapper>
    );
  }
}

export default ReviewInteractor;
