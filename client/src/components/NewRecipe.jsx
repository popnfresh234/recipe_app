import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import { Grid, Input, Header, Button, Form, Table, Message } from 'semantic-ui-react';
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
      error: '',
    };

    this.onIngredientChange = this.onIngredientChange.bind( this );
    this.onDirectionChange = this.onDirectionChange.bind( this );
    this.addIngredient = this.addIngredient.bind( this );
    this.addDirection = this.addDirection.bind( this );
    this.updateIngredient = this.updateIngredient.bind( this );
    this.updateDirection = this.updateDirection.bind( this );
    this.onRecipeChange = this.onRecipeChange.bind( this );
    this.onSubmitRecipe = this.onSubmitRecipe.bind( this );
    this.validateRecipe = this.validateRecipe.bind( this );
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

  onSubmitRecipe() {
    const valid = this.validateRecipe();
    if ( valid ) {
      this.setState( {
        error: '',
      } );
      console.log( this.state.recipe );
    }
  }

  validateRecipe() {
    if ( this.state.recipe.name
      && this.state.recipe.category
      && this.state.recipe.description
      && this.state.recipe.duration
      && this.state.recipe.ingredients.length
      && this.state.recipe.directions.length ) {
      return true;
    }
    this.setState( {
      error: 'Please fill in all fields',
    } );
    return false;
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

    return (
      <Grid stackable padded columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Grid.Row><Header size="tiny">RECIPE NAME</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input error={!this.state.recipe.name} onChange={this.onRecipeChange} name="name" value={this.state.recipe.name} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">CATEGORY</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Input error={!this.state.recipe.category} onChange={this.onRecipeChange} name="category" value={this.state.recipe.category} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">DESCRIPTION</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Input error={!this.state.recipe.description} onChange={this.onRecipeChange} name="description" value={this.state.recipe.description} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">DURATION</Header></Grid.Row>
            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Input error={!this.state.recipe.duration} type="number" onChange={this.onRecipeChange} name="duration" value={this.state.recipe.duration} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Grid.Row><Header size="tiny">INGREDIENTS</Header></Grid.Row>

            <Table unstackable compact>
              <Table.Body>
                {ingredients}
                <Table.Row>
                  <Table.Cell collapsing><Input error={!this.state.recipe.ingredients.length} value={this.state.quantity} style={{ width: '4rem' }} name="quantity" onChange={this.onIngredientChange} /></Table.Cell>
                  <Table.Cell collapsing><Input error={!this.state.recipe.ingredients.length} value={this.state.units} style={{ width: '4rem' }} name="units" onChange={this.onIngredientChange} /></Table.Cell>
                  <Table.Cell><Input error={!this.state.recipe.ingredients.length} value={this.state.name} fluid onChange={this.onIngredientChange} name="name" /></Table.Cell>
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
                      <Form.TextArea error={!this.state.recipe.directions.length} value={this.state.description} onChange={this.onDirectionChange} name="description" />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Table unstackable compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Button icon="plus" onClick={this.addDirection} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Button onClick={this.onSubmitRecipe}>Submit</Button>
                  </Table.Cell>

                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    {this.state.error && <Message negative header="Error" content={this.state.error} />}
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

