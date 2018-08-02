import React, { Component } from 'react';
import { Grid, Input, Header, Button, Icon, Table } from 'semantic-ui-react';
import NewRecipeIngredient from './NewRecipeIngredient.jsx';


class NewRecipe extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      currentIngredient: {},
      ingredients: [],
      quantity: '',
      units: '',
      description: '',
    };

    this.onChange = this.onChange.bind( this );
    this.addIngredient = this.addIngredient.bind( this );
    this.updateIngredient = this.updateIngredient.bind( this );
  }


  onChange( e ) {
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
      const { ingredients, currentIngredient } = this.state;
      const listIngredient =
      ( <NewRecipeIngredient
        updateIngredient={this.updateIngredient}
        key={ingredients.length}
        position={ingredients.length}
        quantity={currentIngredient.quantity}
        units={currentIngredient.units}
        description={currentIngredient.description}
      /> );


      ingredients.push( listIngredient );
      this.setState( {
        currentIngredient: {},
        ingredients,
        quantity: '',
        units: '',
        description: '',
      } );
    }
  }

  updateIngredient( currentIngredient, position ) {
    const ingredients = this.state.ingredients;
    const listIngredient =
      ( <NewRecipeIngredient
        updateIngredient={this.updateIngredient}
        key={position}
        position={position}
        quantity={currentIngredient.quantity}
        units={currentIngredient.units}
        description={currentIngredient.description}
      /> );
    ingredients[position] = listIngredient;
    this.setState( { ingredients } );
  }

  render() {
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
                {this.state.ingredients}
                <Table.Row>
                  <Table.Cell collapsing><Input value={this.state.quantity} style={{ width: '4rem' }} name="quantity" onChange={this.onChange} /></Table.Cell>
                  <Table.Cell collapsing><Input value={this.state.units} style={{ width: '4rem' }} name="units" onChange={this.onChange} /></Table.Cell>
                  <Table.Cell><Input value={this.state.description} fluid onChange={this.onChange} name="description" /></Table.Cell>
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

