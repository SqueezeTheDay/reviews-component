import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewRow from './ReviewRow.jsx';
import BodyWrapper from '../styles/Body.style.js';

// axios.defaults.baseURL = '/reviews-module';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: window.location.pathname.split('/')[1] || 1,
      reviews: [],
    };
    this.getReviews = this.getReviews.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }
  getReviews() {
    axios.get(`http://localhost:3002/reviews/${this.state.productId}/`)
      .then((res) => {
        console.log(res.data.rows)
        this.setState({
          reviews: res.data.rows,
        });
      })
      .catch((err, res) => {
        console.log(err, res);
      });
  }
  render() {
    return (
      <BodyWrapper>
        {
          this.state.reviews.map(review => (
            <ReviewRow review={review} key={review.reviewid} />))
        }
      </BodyWrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'));

