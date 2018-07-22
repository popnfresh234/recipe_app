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
    user_id: req.session.id[0],
  };
  knex('recipes')
    .returning('id')
    .insert(recipeBase)
    .then((recipeId) => {
      // Insert ingredients
      const { ingredients, directions } = recipe;
      const dbIngredients = ingredients.map(ingredient => (
        {
          name: ingredient.name,
          quantity: ingredient.quantity,
          recipe_id: recipeId[0],
          user_id: req.session.id[0],
        }));
      const dbDirections = directions.map(direction => (
        {
          description: direction.description,
          recipe_id: recipeId[0],
        }
      ));
      knex('ingredients')
        .insert(dbIngredients)
        .then(() => {
          knex('directions')
            .insert(dbDirections)
            .then(() => {
              res.status(201).send('Recipe Created');
            }).catch((err) => {
              res.status(400).send('Insert directions error');
            });
        }).catch((err) => {
          res.status(400).send('Insert ingredients error');
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


//* ********************************************
//* ** PUT /api/favorite/:user_id/ ***
//* ** Favorite or Unfavorite a recipe
//* ********************************************

router.put('/favorite/:recipe_id', verifyUser, (req, res, next) => {
  // Query db to see if recipe already favoritd
  knex.select()
    .from('favorites')
    .where('recipe_id', req.params.recipe_id)
    .then((results) => {
      if (results.length) {
        knex('favorites')
          .where('recipe_id', req.params.recipe_id)
          .del()
          .then(() => {
            res.status(200).send('Unfavorited');
          });
      } else {
        knex('favorites')
          .insert({ user_id: req.session.id[0], recipe_id: req.params.recipe_id })
          .then(() => {
            res.status(200).send('Favorited');
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Bad favorite');
    });
  // If yes, delete
  // Else, insert
});
module.exports = router;
