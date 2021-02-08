require('dotenv').config();

const { PORT, MONGODB_URL, HOME_PAGE_DOMAIN } = process.env;

const config = { PORT, MONGODB_URL, HOME_PAGE_DOMAIN };

module.exports = config;
