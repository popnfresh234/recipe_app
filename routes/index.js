const express = require('express');

const router = express.Router();

router.get('/:user_id/recipes', (req, res, next) => {
  res.status(200).send(`GET /api/${req.params.user_id}/recipes`);
});

router.post('/register', (req, res, next) => {
  res.status(200).send('POST /api/register');
});

router.post('/login', (req, res, next) => {
  res.status(200).send('POST /api/login');
});

router.post('/logout', (req, res, next) => {
  res.status(200).send('POST /api/logout');
});

module.exports = router;
