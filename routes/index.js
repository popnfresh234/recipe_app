const express = require('express');
const bcrypt = require('bcrypt');

const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const verifyUser = require('./utils.js');

const router = express.Router();

//* ********************************************
//* ** GET /api/:user_id/recipes' ***
//* ** Register a new uesr
//* ********************************************


router.get('/:user_id/recipes', verifyUser, (req, res, next) => {
  res.status(200).send(`GET /api/${req.params.user_id}/recipes`);
});


//* ********************************************
//* ** POST /api/register' ***
//* ** Register a new uesr
//* ********************************************

router.post('/register', (req, res, next) => {
//   {
//     "username": "Alex",
//     "email": "ajhollid@gmail.com",
//     "password": "test",
//     "confirmPassword": "test"
//    }

  const { body } = req;
  const sanitizedEmail = body.email.toLowerCase();
  const hashedPassword = bcrypt.hashSync(body.password, 10);
  const user = {
    name: body.username,
    email: sanitizedEmail,
    password: hashedPassword,
  };

  knex.select().from('users').where('email', sanitizedEmail)
    .then((results) => {
      // If we have no results, email not registered, we can create user
      if (results.length === 0) {
        return knex('users').insert(user).returning('id');
      }
      return Promise.reject(new Error('This email is already taken'));
    })
    .then((id) => {
      const newUser = {
        id: id[0],
        email: sanitizedEmail,
        name: body.username,
        password: hashedPassword,
      };
      req.session.id = id;
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(409).send(err.message);
    });
});

//* ********************************************
//* ** POST /api/login' ***
//* ** Log in a user
//* ********************************************

router.post('/login', (req, res, next) => {
// {
//   "email": "ajhollid@gmail.com",
//   "password": "test"
// }
  let { email, password } = req.body;
  email = email.toLowerCase();
  knex.select()
    .from('users')
    .where('email', email)
    .then((result) => {
      if (!result.length) {
        return Promise.reject(new Error('Email not found'));
      }
      if (bcrypt.compareSync(password, result[0].password)) {
        req.session.id = result[0].id;
        return result[0];
      }
      return Promise.reject(new Error('Password incorrect'));
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

//* ********************************************
//* ** POST /api/logout' ***
//* ** Log out a user
//* ********************************************

router.post('/logout', (req, res, next) => {
  req.session = null;
  res.status(200).send('Logged out');
});

module.exports = router;
