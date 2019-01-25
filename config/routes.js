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
const authorize = require('../auth/authorize.js');
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
      res.status(201).json({ id: Ids[0] }); // returns the userId created by the database
    })
    .catch(err => res.status(500).send(err));
});

function login(req, res) {
  // implement user login
}

router.get('/jokes', (req, res) => {
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
