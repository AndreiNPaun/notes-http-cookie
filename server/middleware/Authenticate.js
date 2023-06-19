const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Token Expired.',
      });
    } else {
      console.log(error);
      res.status(500).json({
        message: 'Authentication failed.',
      });
    }
  }
};

module.exports = authenticate;
