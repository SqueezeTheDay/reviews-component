const faker = require('faker');

const getRandomNumBetween = ((min, max) =>
  Math.floor((Math.random() * ((max - min) + 1)) + min)
);
const getRandomTimestamp = () => {
  const timestamp = faker.date.past().toISOString();
  return timestamp.replace('T', ' ').substring(0, 19);
};

const db = process.argv[2];
/* ******************USER DATA GENERATORS***************** */
const bodyTypes = ['curvy', 'athletic', 'lean', 'petite', 'muscular', 'slim', 'solid'];
const athleticTypes = ['sweaty generalist', 'yogi', 'runner', 'dancer', 'cyclist'];
const countries = ['U.S.', 'Vietnam', 'Philippines', 'China', 'South Korea', 'Ireland', 'Japan', 'Kazakhstan', 'Mexico', 'Taiwan', 'Scotland', 'United Kingdom', 'Kenya', 'Australia'];

const generateUserData = () => {
  const data = [];
  const nickname = faker.internet.userName();
  const activeSince = getRandomTimestamp();
  const age = getRandomNumBetween(18, 80);
  const bodyType = bodyTypes[getRandomNumBetween(0, bodyTypes.length - 1)];
  const athleticType = athleticTypes[getRandomNumBetween(0, athleticTypes.length - 1)];
  const city = faker.address.city();
  const state = faker.address.state();
  const country = countries[getRandomNumBetween(0, countries.length - 1)];
  data.push(nickname, activeSince, age, bodyType, athleticType, city, state, country);
  return data.join(',');
};
/* ******************REVIEWS DATA GENERATORS***************** */
const fitOptions = ['second skin', 'tight', 'snug', 'just right', 'roomy', 'oversized', 'flowy'];

const generateReviewsData = (productId) => {
  const data = [];
  const createdAt = getRandomTimestamp();
  const title = faker.lorem.words();
  const details = faker.lorem.paragraph(getRandomNumBetween(5, 10));
  const fit = fitOptions[getRandomNumBetween(0, fitOptions.length - 1)];
  const rating = getRandomNumBetween(1, 5);
  const whatYouLike = faker.lorem.words();
  const whatYouDidntLike = faker.lorem.words();
  const votedHelpful = getRandomNumBetween(0, 10);
  const votedNotHelpful = getRandomNumBetween(0, 10);
  const inappropriate = 0;
  const userId = getRandomNumBetween(1, 10e6);
  if (db !== 'couch') {
    data.push(
      createdAt, title, details, fit, rating, whatYouLike, whatYouDidntLike,
      votedHelpful, votedNotHelpful, inappropriate, userId, productId,
    );
  } else {
    data.push(
      createdAt, title, details, fit, rating, whatYouLike, whatYouDidntLike,
      votedHelpful, votedNotHelpful, inappropriate, productId,
    );
  }
  let psqlFormatted = data.map(val => typeof val === 'string' ? `'${val}'` : val);
  return {
    csvFormat: data.join(','),
    psqlFormat: psqlFormatted.join(','),
  }
};

module.exports = {
  getRandomNumBetween,
  generateUserData,
  generateReviewsData,
};
