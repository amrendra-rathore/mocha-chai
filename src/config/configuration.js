const dotenv = require('dotenv');

dotenv.config();
const configurations = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT)
};
Object.freeze(configurations);
module.exports = configurations;
