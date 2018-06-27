// const { Client } = require('pg');
const pg = require('pg');

const port = 5432;
const connectionString = `postgres://staceyrutherford:''@localhost/ip:${port}/lululemon`;
const client = new pg.Client(connectionString);
// const client = new Client({
//   user: 'staceyrutherford',
//   host: 'localhost',
//   database: 'lululemon',
//   port: 5432,
// });
client.connect((err, conn) => {
  if (err) {
    console.log('could not connect to postgres', err)
  } else {
    console.log('success');
  }
});
console.log("db ran")
const getReviews = function (productId, callback) {
  const query = `
      SELECT 
      *, 
      users.id AS userId, 
      users.active_since AS memberSince,
      users.athletic_type AS athleticType, 
      users.body_type AS bodyType,
      reviews.id AS reviewId, 
      reviews.created_at AS createdAt,
      reviews.what_you_like AS whatYouLike, 
      reviews.what_you_didnt_like AS whatYouDidntLike,
      reviews.voted_helpful AS votedHelpful,
      reviews.voted_not_helpful AS votedNotHelpful
    FROM reviews
    LEFT JOIN users ON reviews.user_id=users.id
    WHERE reviews.product_id=?;
    `;

  client.query(query, [productId], (err, result) => {
    if (err) { callback(err, null); }
    callback(null, result);
  });
};

const updateReview = function (reviewId, field, value, callback) {
  const snakedField = helpers.camelToSnake(field);
  console.log(reviewId, snakedField, value);
  const query = `UPDATE reviews SET ${snakedField}=? WHERE id=?;`;
  client.query(query, [value, reviewId], (err) => {
    if (err) {
      throw err;
    }
    callback();
  });
};

const createReview = function (newReview) {
  const query = `
      INSERT INTO reviews
      (
      created_at,
      title,
      details,
      fit,
      rating,
      what_you_like,
      what_you_didnt_like,
      voted_helpful,
      voted_not_helpful,
      inappropriate,
      user_id,
      product_id
      )
      VALUES(${newReview})    
    `;

  client.query(query, (err) => {
    if (err) { throw err; }
    console.log('new review added to RDBMS db');
  });
};

const deleteReview = function (productId) {
  const query = `DELETE FROM reviews WHERE reviews.product_id = ${productId}`;
  client.query(query, (err) => {
    if (err) { throw err; }
    console.log('review deleted to RDBMS db');
  });
};

client.end();

module.exports = {
  getReviews,
  updateReview,
  createReview,
  deleteReview,
};
