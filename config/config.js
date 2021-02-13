require('dotenv').config();

const { PORT, MONGODB_URL, HOME_PAGE_DOMAIN, JWTSECRET } = process.env;

const config = { PORT, MONGODB_URL, HOME_PAGE_DOMAIN, JWTSECRET };

module.exports = config;
