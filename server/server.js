const express = require('express');
const path = require('path');
const cors = require('cors');
const generator = require('../database/mockData/dataGenerator.js');
const db = require('../database/RDBMdb.js');
// const db = require('../database/archive/db.js');

const app = express();

app.listen(3002, () => console.log('Listening on port 3002...'));

/* ******** MIDDLEWARE ************************ */
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:productId', express.static(path.join(__dirname, '../public')));

/* ******** ROUTING *************************** */
app.get('/reviews/:id/', (req, res) => {
  db.getReviews(req.params.id, (err, reviews) => {
    if (err) { res.status(404).send(err) };
    console.log('reviews: ', reviews);
    res.status(200).send(reviews);
  });
});
app.put('/reviews-module/reviews', (req, res) => {
  const { reviewId, field, value } = req.body;
  console.log('received put request with: ', reviewId, field, value);
  db.updateReview(reviewId, field, value, () => {
    res.status(204).end();
  });
});

//  ******** CREATE & DELETE IN CRUD *************************** 
app.post('/reviews/:id', (req, res) => {
  const newReview = generator.generateReviewsData(req.params.id);
  db.createReview(newReview);
  res.status(201).end();
});
app.delete('/reviews/:id', (req, res) => {
  db.deleteReview(req.params.id);
  res.status(201).end();
});

