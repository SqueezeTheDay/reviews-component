const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const generator = require('../database/mockData/dataGenerator.js');
const db = require('../database/RDBMdb.js');

const app = express();

app.listen(3002, () => console.log('Listening on port 3002...'));

/* ******** MIDDLEWARE ************************ */
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:productId', express.static(path.join(__dirname, '../public')));

/* ******** ROUTING *************************** */
app.get('/reviews/:id/', (req, res) => {
  db.getReviews(req.params.id, (err, reviews) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(reviews);
    }
  });
});
app.put('/reviews', (req, res) => {
  const { reviewId, field, value } = req.body;
  console.log('received put request with: ', reviewId, field, value);
  db.updateReview(reviewId, field, value, () => {
    res.status(204).end();
  });
});

/*  ******** CREATE & DELETE IN CRUD ***************************  */
app.post('/reviews/:id/', (req, res) => {
  const newReview = generator.generateReviewsData(req.params.id).psqlFormat;
  db.createReview(newReview);
  res.status(201).send(`created review: ${newReview}`);
});
app.delete('/reviews/:id/', (req, res) => {
  db.deleteReviews(req.params.id);
  res.status(201).send('deleted review');
});
