const fs = require('fs');
const generate = require('./dataGenerator.js');

let userHeader = 'nickname,active_since,age,body_type,athletic_type,city,state,country\n';

let reviewsHeader = 'created_at,title,details,fit,rating,what_you_like,what_you_didnt_like,voted_helpful,voted_not_helpful,inappropriate,user_id,product_id\n';

let productHeader = 'id\n';

/* ******************USER DATA CVS WRITER***************** */
if (db !== 'couch') {
  console.log(`creating user csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  fs.writeFileSync('./users.csv', userHeader);

  let users = [];
  for (let i = 1; i <= 10e6; i += 1) {
    users.push(generate.generateUserData());
    if (i % 100000 === 0) {
      fs.appendFileSync('./users.csv', `${users.join('\n')}\n`);
      users = [];
    }
  }

  console.log(`creating user csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
  console.log('users csv created!');
}

/* ******************REVIEWS DATA CVS WRITER***************** */
console.log(`creating review csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
fs.writeFileSync('./reviews.csv', reviewsHeader);

let reviews = [];
for (let i = 1; i <= 10e6; i += 1) {
  reviews.push(generate.generateReviewsData(generate.getRandomNumBetween(1, 10e6)));
  if (i % 100000 === 0) {
    fs.appendFileSync('./reviews.csv', `${reviews.join('\n')}\n`);
    reviews = [];
  }
}
console.log(`creating review csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
console.log('reviews csv created!');

/* ******************PRODUCTS CVS WRITER***************** */
console.log(`creating products csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
fs.writeFileSync('./products.csv', productHeader);
let products = [];
for (let i = 1; i <= 10e6; i += 1) {
  if (db === 'couch') {
    products.push(`product,${i}`);
  } else {
    products.push(i);
  }
  if (i % 100000 === 0) {
    fs.appendFileSync('./products.csv', `${products.join('\n')}\n`);
    products = [];
  }
}
console.log(`creating products csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
console.log('products csv created!');
