module.exports = async () => {
  let server = require('../server');
  const mongoose = require('mongoose');

  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
  server.close();
};
