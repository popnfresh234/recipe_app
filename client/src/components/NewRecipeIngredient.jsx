import React, { Component } from 'react';
import { Input, Table } from 'semantic-ui-react';


class NewRecipeIngredient extends Component {
  constructor( props ) {
    super( props );
    this.onUpdateIngredient = this.onUpdateIngredient.bind( this );
    this.ingredient = {
      id: this.props.id,
      quantity: this.props.quantity,
      units: this.props.units,
      name: this.props.name,
    };
    this.state = {
      quantity: this.props.quantity,
      units: this.props.units,
      name: this.props.name,
    };
  }

  onUpdateIngredient( e ) {
    this.ingredient[e.target.name] = e.target.value;
    this.setState( {
      [e.target.name]: e.target.value,
    } );
    this.props.updateIngredient( this.ingredient, this.props.position );
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell collapsing ><Input className="ingredient-input" name="quantity" style={{ width: '4rem' }} value={this.state.quantity} onChange={this.onUpdateIngredient} /></Table.Cell>
        <Table.Cell collapsing ><Input className="ingredient-input" name="units" style={{ width: '8rem' }} value={this.state.units} onChange={this.onUpdateIngredient} /></Table.Cell>
        <Table.Cell><Input className="ingredient-input" name="name" style={{ backgroundColor: 'rgba(177,216,185,0.5' }} fluid value={this.state.name} onChange={this.onUpdateIngredient} /></Table.Cell>
      </Table.Row>
    );
  }
}

export default NewRecipeIngredient;
