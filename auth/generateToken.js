const jwt = require('jsonwebtoken');

module.exports = user => {
  const payload = {
    username: user.username
  };

  const jwtKey =
    process.env.JWT_SECRET ||
    'add a .env file to root of project with the JWT_SECRET variable';

  const options = {
    expiresIn: 60 // 60 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  return jwt.sign(payload, jwtKey, options);
};
