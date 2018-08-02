/* eslint class-methods-use-this: 0 */ // --> OFF
import React, { Component } from 'react';
import { Grid, Image, Header, Table, List } from 'semantic-ui-react';
import axios from 'axios';
import Ingredient from './Ingredient.jsx';
import Direction from './Direction.jsx';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipe: '',
    };
    this.onQuantityChange = this.onQuantityChange.bind( this );
  }


  componentDidMount() {
    axios.get( `/api/recipes/${this.props.match.params.id}` )
      .then( ( result ) => {
        const ingredients = this.calcIngredients( result.data.ingredients, 1 );

        const directions = result.data.directions
          .map( direction => ( <Direction
            key={direction.id}
            description={direction.description}
          /> ) );
        this.setState( {
          recipe: result.data,
          rawIngredients: result.data.ingredients,
          ingredients,
          directions,
        } );
      } ).catch( ( err ) => {
        console.log( err );
      } );
  }

  onQuantityChange( origValue, e ) {
    let multiplier = e.target.value / origValue;
    if ( multiplier <= 0 ) {
      multiplier = 1;
    }
    const ingredients = this.calcIngredients( this.state.rawIngredients, multiplier );
    this.setState( { ingredients } );
  }

  calcIngredients( ingredients, multiplier ) {
    return ingredients
      .map( ingredient => ( <Ingredient
        key={ingredient.id}
        name={ingredient.name}
        units={ingredient.units}
        quantity={ingredient.quantity}
        multipliedQuantity={ingredient.quantity * multiplier}
        onQuantityChange={this.onQuantityChange}
      /> ) );
  }


  render() {
    return (

      <Grid stackable columns="equal">
        <Grid.Row>
          <Grid.Column >
            <Image size="medium" centered src={this.state.recipe.image_url} />
          </Grid.Column>
          <Grid.Column className="green-column">
            <Header textAlign="center">{this.state.recipe.name}</Header>
            <Header>INGREDIENTS</Header>
            <Table unstackable compact>
              <Table.Body>

                {this.state.ingredients}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="green-column" style={{ paddingLeft: '2em' }}>
            <Header>DIRECTIONS</Header>
            <List ordered>
              {this.state.directions}
            </List>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>

    );
  }
}

export default RecipeDetails;
