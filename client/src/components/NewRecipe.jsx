import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import { Grid, Input, Header, Button, Form, Table } from 'semantic-ui-react';
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
      name: '',
      description: '',
    };

    this.onIngredientChange = this.onIngredientChange.bind( this );
    this.onDirectionChange = this.onDirectionChange.bind( this );
    this.addIngredient = this.addIngredient.bind( this );
    this.addDirection = this.addDirection.bind( this );
    this.updateIngredient = this.updateIngredient.bind( this );
    this.updateDirection = this.updateDirection.bind( this );

    this.onRecipeChange = this.onRecipeChange.bind( this );
  }

  onRecipeChange( e ) {
    const { recipe } = this.state;
    recipe[e.target.name] = e.target.value;
    this.setState( {
      recipe,
    } );
  }

  onIngredientChange( e ) {
    const { currentIngredient } = this.state;
    currentIngredient[e.target.name] = e.target.value;
    this.setState( {
      currentIngredient,
      [e.target.name]: e.target.value,
    } );
  }

  onDirectionChange( e ) {
    const { currentDirection } = this.state;
    currentDirection[e.target.name] = e.target.value;
    this.setState( {
      currentDirection,
      [e.target.name]: e.target.value,
    } );
  }


  addIngredient() {
    if ( this.state.currentIngredient.name
        && this.state.currentIngredient.units
         && this.state.currentIngredient.quantity ) {
      const { recipe, currentIngredient } = this.state;
      currentIngredient.id = uuidv1();
      recipe.ingredients.push( currentIngredient );
      this.setState( {
        currentIngredient: {},
        recipe,
        quantity: '',
        units: '',
        name: '',
      } );
    }
  }

  addDirection() {
    if ( this.state.currentDirection.description ) {
      const { recipe, currentDirection } = this.state;
      currentDirection.id = uuidv1();
      recipe.directions.push( currentDirection );
      this.setState( {
        currentDirection: {},
        recipe,
        description: '',
      } );
    }
  }

  updateIngredient( currentIngredient, position ) {
    console.log( currentIngredient );
    const { recipe } = this.state;
    if ( !currentIngredient.name
      && !currentIngredient.quantity
      && !currentIngredient.units ) {
      recipe.ingredients.splice( position, 1 );
    } else {
      recipe.ingredients[position] = currentIngredient;
    }

    this.setState( { recipe } );
  }

  updateDirection( currentDirection, position ) {
    const { recipe } = this.state;
    if ( !currentDirection.description ) {
      recipe.directions.splice( position, 1 );
    } else {
      recipe.directions[position] = currentDirection;
    }
    this.setState( { recipe } );
  }

  render() {
    const ingredients = this.state.recipe.ingredients.map( ( ingredient, index ) => (
      <NewRecipeIngredient
        key={ingredient.id}
        id={ingredient.id}
        updateIngredient={this.updateIngredient}
        position={index}
        quantity={ingredient.quantity}
        units={ingredient.units}
        name={ingredient.name}
      />
    ) );

    const directions = this.state.recipe.directions.map( ( direction, index ) => (
      <NewRecipeDirection
        key={direction.id}
        id={direction.id}
        position={index}
        updateDirection={this.updateDirection}
        description={direction.description}
      />
    ) );

    console.log( this.state.recipe );
    return (
      <Grid stackable padded columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Grid.Row><Header size="tiny">RECIPE NAME</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input onChange={this.onRecipeChange} name="name" value={this.state.recipe.name} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">CATEGORY</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input onChange={this.onRecipeChange} name="category" value={this.state.recipe.category} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">DESCRIPTION</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input onChange={this.onRecipeChange} name="description" value={this.state.recipe.description} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">DURATION</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input type="number" onChange={this.onRecipeChange} name="duration" value={this.state.recipe.duration} /></Table.Cell>
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
                  <Table.Cell><Input value={this.state.name} fluid onChange={this.onIngredientChange} name="name" /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Button icon="plus" onClick={this.addIngredient} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">DIRECTIONS</Header></Grid.Row>

            <Table unstackable compact>
              <Table.Body>
                {directions}
                <Table.Row>
                  <Table.Cell>
                    <Form>
                      <Form.TextArea value={this.state.description} onChange={this.onDirectionChange} name="description" />
                    </Form>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Button icon="plus" onClick={this.addDirection} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Button>Submit</Button>
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

