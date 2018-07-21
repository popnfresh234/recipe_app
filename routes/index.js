const express = require('express');
const bcrypt = require('bcrypt');

const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);

const router = express.Router();

router.get('/:user_id/recipes', (req, res, next) => {
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
  res.status(200).send('POST /api/login');
});

//* ********************************************
//* ** POST /api/logout' ***
//* ** Log out a user
//* ********************************************

router.post('/logout', (req, res, next) => {
  res.status(200).send('POST /api/logout');
});

module.exports = router;
