import React, { Component } from 'react';
import { Grid, Input, Header, Button, Icon, Table } from 'semantic-ui-react';


class NewRecipe extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      currentIngredient: {},
      ingredients: [],
    };

    this.onChange = this.onChange.bind( this );
    this.addIngredient = this.onChange.bind( this );
  }


  onChange( e ) {
    const currentIngredient = this.state.currentIngredient;
    currentIngredient[e.target.name] = e.target.value;
    this.setState( {
      currentIngredient,
    } );
    console.log( this.state.currentIngredient );
  }

  addIngredient() {
    if ( this.state.currentIngredient.description
        && this.state.currentIngredient.units
         && this.state.currentIngredient.quantity ) {
      const ingredients = this.state.ingredients;
      ingredients.push( this.state.currentIngredient );
      this.setState( {
        ingredients,
      } );
      console.log( this.state.ingredients );
    }
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
                <Table.Row>
                  <Table.Cell collapsing><Input style={{ width: '4rem' }} name="quantity" onChange={this.onChange} /></Table.Cell>
                  <Table.Cell collapsing><Input style={{ width: '4rem' }} name="units" onChange={this.onChange} /></Table.Cell>
                  <Table.Cell><Input fluid onChange={this.onChange} name="description" /></Table.Cell>
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

