import React, { Component } from 'react';
import { Grid, Input, Header, Button, Icon, Table } from 'semantic-ui-react';
import NewRecipeIngredient from './NewRecipeIngredient.jsx';
import NewRecipeDirection from './NewRecipeDirection.jsx';


class NewRecipe extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      currentIngredient: {},
      currentDirection: {},
      recipe: {
        name: '',
        category: '',
        description: '',
        image_url: '',
        duration: '',
        ingredients: [],
        directions: [],
      },
      quantity: '',
      units: '',
      description: '',
    };

    this.onChange = this.onIngredientChange.bind( this );
    this.addIngredient = this.addIngredient.bind( this );
    this.updateIngredient = this.updateIngredient.bind( this );
  }


  onIngredientChange( e ) {
    const { currentIngredient } = this.state;
    currentIngredient[e.target.name] = e.target.value;
    this.setState( {
      currentIngredient,
      [e.target.name]: e.target.value,
    } );
  }


  addIngredient() {
    if ( this.state.currentIngredient.description
        && this.state.currentIngredient.units
         && this.state.currentIngredient.quantity ) {
      const { recipe, currentIngredient } = this.state;
      recipe.ingredients.push( currentIngredient );
      this.setState( {
        currentIngredient: {},
        recipe,
        quantity: '',
        units: '',
        description: '',
      } );
    }
  }

  updateIngredient( currentIngredient, position ) {
    const { recipe } = this.state;
    recipe.ingredients[position] = currentIngredient;
    this.setState( { recipe } );
  }

  render() {
    const ingredients = this.state.recipe.ingredients.map( ( ingredient, index ) => (
      <NewRecipeIngredient
        updateIngredient={this.updateIngredient}
        key={index}
        position={index}
        quantity={ingredient.quantity}
        units={ingredient.units}
        description={ingredient.description}
      />
    ) );

    console.log( this.state.recipe.ingredients );
    return (
      <Grid stackable padded columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Grid.Row><Header size="tiny">RECIPE NAME</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">INGREDIENTS</Header></Grid.Row>

            <Table unstackable compact>
              <Table.Body>
                {ingredients}
                <Table.Row>
                  <Table.Cell collapsing><Input value={this.state.quantity} style={{ width: '4rem' }} name="quantity" onChange={this.onIngredientChange} /></Table.Cell>
                  <Table.Cell collapsing><Input value={this.state.units} style={{ width: '4rem' }} name="units" onChange={this.onIngredientChange} /></Table.Cell>
                  <Table.Cell><Input value={this.state.description} fluid onChange={this.onIngredientChange} name="description" /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Button icon="plus" onClick={this.addIngredient} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
                2
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default NewRecipe;

