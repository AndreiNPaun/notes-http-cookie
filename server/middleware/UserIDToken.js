const jwt = require('jsonwebtoken');

// gets the user id from the token
const getUserIDFromToken = (token) => {
  try {
    // const tokenReceived = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded.id;
  } catch (error) {
    return error;
  }
};

module.exports = { getUserIDFromToken };
