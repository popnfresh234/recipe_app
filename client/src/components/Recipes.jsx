import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import axios from 'axios';

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
      myrecipes: () => '/api/1/recipes/',
      random: () => '/api/recipes/random',
    };

    const fn = pageMap[this.props.rootPath];
    if ( fn ) {
      axios.get( fn() )
        .then( ( baseRecipeResponse ) => {
          console.log( baseRecipeResponse.data );
        } );
    }
  }

  render() {
    return ( <p> test </p> );
  }
}

export default Recipes;
