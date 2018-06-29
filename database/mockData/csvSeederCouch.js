const fs = require('fs');
const generate = require('./dataGenerator.js');

let header = 'nickname,active_since,age,body_type,athletic_type,city,state,country,created_at,title,details,fit,rating,what_you_like,what_you_didnt_like,voted_helpful,voted_not_helpful,inappropriate,product_id\n';

/* ******************REVIEWS DATA CVS WRITER***************** */
console.log(`creating csv:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
fs.writeFileSync('./reviews.csv', header);

let reviews = [];
for (let i = 1; i <= 10e6; i += 1) {
  reviews.push(`${generate.generateUserData()},${generate.generateReviewsData(i).csvFormat}`);
  if (i % 100000 === 0) {
    fs.appendFileSync('./reviews.csv', `${reviews.join('\n')}\n`);
    reviews = [];
  }
}
console.log(`reviews csv created!:  ${new Date().getMinutes()}:${new Date().getSeconds()}`);
