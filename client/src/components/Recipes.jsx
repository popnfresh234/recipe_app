import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react';


import axios from 'axios';
import RecipeOverview from './RecipeOverview.jsx';

class Recipes extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipes: [],
    };
  }


  componentDidMount() {
    const pageMap = {
      recipes: () => '/api/recipes',
      myrecipes: () => `/api/${this.props.userId}/recipes/`,
      random: () => '/api/recipes/random',
    };

    const fn = pageMap[this.props.rootPath];
    if ( fn ) {
      axios.get( fn() )
        .then( ( baseRecipeResponse ) => {
          console.log( baseRecipeResponse.data );
          const recipes = baseRecipeResponse.data.map( recipe => <RecipeOverview key={recipe.id} recipe={recipe} /> );
          this.setState( {
            recipes,
          } );
        } );
    }
  }


  render() {
    return (
      <Container>
        <Card.Group stackable itemsPerRow={4}>
          {this.state.recipes}
        </Card.Group>
      </Container> );
  }
}

export default Recipes;
