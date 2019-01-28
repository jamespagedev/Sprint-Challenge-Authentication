/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const axios = require('axios');
const express = require('express');
const db = require('../database/helpers/dbHelpers.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const authenticate = require('../auth/authenticate.js');
const generateToken = require('../auth/generateToken.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.post('/register', (req, res) => {
  // implement user registration
  const newUserCreds = req.body;

  newUserCreds.password = bcrypt.hashSync(
    newUserCreds.password,
    db.settings.pwdHashLength
  );

  db.addUser(newUserCreds)
    .then(Ids => {
      db.findByUsername(newUserCreds.username)
        .first()
        .then(user => {
          if (user) {
            const token = generateToken(user); // Token should result as guest permissions until user verifies (via email)
            res.status(201).json({ id: Ids[0], token }); // returns the userId created by the database, and the token string
          } else {
            res.status(401).json({ err: 'You shall not pass!' });
          }
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

router.post('/login', (req, res) => {
  // implement user login
  const userCreds = req.body;

  db.findByUsername(userCreds.username)
    .first() // returns the first single object (containing the user found) in the array. If no objects were found, an empty array is returned.
    .then(user => {
      // If user object was obtained AND...
      // the client password matches the db hash password
      if (user && bcrypt.compareSync(userCreds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Logged in', token });
      } else {
        res.status(401).json({ err: 'You shall not pass!' });
      }
    })
    .catch(err => res.status(500).send(err));
});

router.get('/jokes', authenticate, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
