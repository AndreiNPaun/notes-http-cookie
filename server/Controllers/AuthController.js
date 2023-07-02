const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const register = async (req, res, next) => {
  try {
    // express-validator (routes) error display
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      console.log('E-Mail is used.');
      return res.status(422).json({ error: 'E-Mail address already exists.' });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPass,
    });

    await user.save();
    res.status(201).json({
      message: 'User registered',
    });
  } catch (error) {
    res.status(500).json({
      error: `An error has occured: ${error}`,
    });
  }
};

const login = async (req, res, next) => {
  try {
    // express-validator (routes) error display
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(422).json({ error: 'Wrong password.' });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    );

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
      })
      .send(true);
  } catch (error) {
    res.status(401).json({ error: `An error has occured: ${error}` });
  }
};

const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = jwt.sign(
      { email: verify.email, id: verify._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );
    res.json({
      message: 'Token refreshed successfully',
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      error: `An error has occured: ${error}`,
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
