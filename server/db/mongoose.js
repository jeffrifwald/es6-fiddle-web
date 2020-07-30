const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGODB_URI,
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  retryWrites: true,
};

let url = '';
if (MONGODB_URI) url = MONGODB_URI;
else { url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}${MONGO_PORT ? `:${MONGO_PORT}` : ''}/${MONGO_DB}`; }

mongoose.connect(url, options)
  .catch(err => console.log(err));

module.exports = mongoose;
