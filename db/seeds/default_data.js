
exports.seed = function create(knex) {
  let recipeId;
  // Deletes ALL existing entries
  return knex('users')
    .returning('id')
    .insert([
      {
        name: 'Alex',
        email: 'ajhollid@gmail.com',
        password: 'password',
      },
      {
        name: 'bob',
        email: 'bob@bob.bob',
        password: 'rowValue2',
      },
    ])
    .then(userIds => knex('recipes')
      .returning('id')
      .insert([
        {
          name: 'Pumpkin Pie',
          category: 'Desert',
          description: 'A good pie',
          directions: 'Make it',
          user_id: userIds[0],
        },
      ]))
    .then((id) => {
      recipeId = id[0];
      return knex('ingredients')
        .returning('id')
        .insert([
          {
            name: 'Pumkin',
          },
          {
            name: 'Pie crust',
          },
        ]);
    })
    .then((ingredientIds) => {
      const recipeIngredients = [];
      ingredientIds.forEach((id, counter) => {
        const recipeIngredient = {
          quantity: counter + 1,
          recipe_id: recipeId,
          ingredient_id: id,
        };
        console.log(recipeIngredient);
        recipeIngredients.push(recipeIngredient);
      });
      return knex('recipe_ingredient').insert(recipeIngredients);
    });
};


// Query for all ingredients for a recipe:

// select recipe_ingredient.quantity, ingredients.name from recipes
// JOIN recipe_ingredient ON recipes.id = recipe_ingredient.recipe_id
// JOIN ingredients ON recipe_ingredient.ingredient_id = ingredients.id;
// WHERE recipes.id = {recipe id}
