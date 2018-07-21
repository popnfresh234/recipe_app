const express = require('express');

const router = express.Router();

//* ********************************************
//* ** GET /api/recipes' ***
//* ** Get all recipes
//* ********************************************

router.get('/', (req, res, next) => {
  res.status(200).send('GET /api/recipes');
});

//* ********************************************
//* ** GET /api/recipes/:recipe_id' ***
//* ** Get a specific recipe
//* ********************************************

router.get('/:recipe_id', (req, res, next) => {
  res.status(200).send(`GET /api/recipes/${req.params.recipe_id}`);
});

//* ********************************************
//* ** POST /api/recipes' ***
//* ** Create a new recipe
//* ********************************************

router.post('/', (req, res, next) => {
  res.status(201).send('POST /api/recipes');
});

//* ********************************************
//* ** DELETE /api/recipes/:recipe_id' ***
//* ** Delete a specific recipe
//* ********************************************

router.delete('/:recipe_id', (req, res, next) => {
  res.status(200).send(`DELETE /api/recipes/${req.params.recipe_id}`);
});

//* ********************************************
//* ** PUT /api/recipes/:recipe_id' ***
//* ** Update a specific recipe
//* ********************************************

router.put('/:recipe_id', (req, res, next) => {
  res.status(200).send(`PUT /api/recipes/${req.params.recipe_id}`);
});

module.exports = router;
