import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Card, Container, Grid, Header } from 'semantic-ui-react';
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
          if ( baseRecipeResponse.data ) {
            const recipes = baseRecipeResponse.data.map( recipe => <RecipeOverview key={recipe.id} recipe={recipe} /> );
            this.setState( {
              recipes,
            } );
          }
        } ).catch( ( err ) => {
          console.log( err );
        } );
    }
  }


  render() {
    let title = '';
    const titleMap = {
      recipes: () => 'All Recipes',
      myrecipes: () => 'My Recipes',
      random: () => 'Random Ideas',
    };
    const titleFn = titleMap[this.props.rootPath];
    if ( titleFn ) {
      title = titleFn();
    }
    return (
      <div>
        <Header textAlign="center">{title}</Header>
        <Container>
          <Card.Group stackable itemsPerRow={this.props.cardsPerRow}>
            { title !== 'Random Ideas' &&
            <Card as={NavLink} exact to="/new-recipe">
              <Grid className="new-recipe-grid" verticalAlign="middle" celled>
                <Grid.Row stretched>
                  <Grid.Column textAlign="center">
                    <FontAwesomeIcon className="recipes-new-recipe-add-icon" icon="plus-circle" color="#b1d8b9" size="4x" />
                    <Header>New Recipe</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>
          }
            {this.state.recipes}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default Recipes;
