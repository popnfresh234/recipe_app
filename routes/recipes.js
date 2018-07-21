const express = require('express');
const verifyUser = require('./utils.js');

const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);

const router = express.Router();


//* ********************************************
//* ** GET /api/recipes' ***
//* ** Get all recipes
//* ********************************************

router.get('/', verifyUser, (req, res, next) => {
  knex.select()
    .from('recipes')
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(204).send('No results');
      }
    });
});

//* ********************************************
//* ** GET /api/recipes/:recipe_id' ***
//* ** Get a specific recipe
//* ********************************************

router.get('/:recipe_id', verifyUser, (req, res, next) => {
  knex.select()
    .from('recipes')
    .where('id', req.params.recipe_id)
    .then((result) => {
      if (result.length) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send('Recipe not found');
      }
    });
});

//* ********************************************
//* ** POST /api/recipes' ***
//* ** Create a new recipe
//* ********************************************

router.post('/', verifyUser, (req, res, next) => {
  const recipe = req.body;
  const recipeBase = {
    name: recipe.name,
    category: recipe.category,
    description: recipe.description,
    directions: recipe.directions,
    user_id: req.session.id[0],
  };
  knex('recipes')
    .returning('id')
    .insert(recipeBase)
    .then((recipeId) => {
      // Insert ingredients
      const { ingredients } = recipe;
      const ingredientNames = ingredients.map(ingredient => ({ name: ingredient.name }));
      knex('ingredients')
        .returning('id')
        .insert(ingredientNames)
        .then((ingredientIds) => {
          const recipeIngredients = ingredientIds.map((id, index) => ({
            quantity: ingredients[index].quantity,
            recipe_id: recipeId[0],
            ingredient_id: id,
          }));
          knex('recipe_ingredient')
            .insert(recipeIngredients)
            .then(() => {
              res.status(201).send('Successful Insert!');
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Bad insert');
    });
});

//* ********************************************
//* ** DELETE /api/recipes/:recipe_id' ***
//* ** Delete a specific recipe
//* ********************************************

router.delete('/:recipe_id', verifyUser, (req, res, next) => {
  res.status(200).send(`DELETE /api/recipes/${req.params.recipe_id}`);
});

//* ********************************************
//* ** PUT /api/recipes/:recipe_id' ***
//* ** Update a specific recipe
//* ********************************************

router.put('/:recipe_id', verifyUser, (req, res, next) => {
  res.status(200).send(`PUT /api/recipes/${req.params.recipe_id}`);
});

module.exports = router;
