import React, { Component } from 'react';
import { Input, Table } from 'semantic-ui-react';


class NewRecipeIngredient extends Component {
  constructor( props ) {
    super( props );
    this.onUpdateIngredient = this.onUpdateIngredient.bind( this );
    this.state = {
      quantity: this.props.quantity,
      units: this.props.units,
      description: this.props.description,
    };
  }

  onUpdateIngredient( key, e ) {
    console.log( key );
    console.log( e.target.value );
    this.setState( {
      [e.target.name]: e.target.value,
    } );
    this.props.updateIngredient( this.state, this.props.position );
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell collapsing ><Input name="quantity" style={{ width: '4rem' }} value={this.state.quantity} onChange={( e ) => { this.onUpdateIngredient( this.props.position, e ); }} /></Table.Cell>
        <Table.Cell collapsing ><Input name="units"style={{ width: '4rem' }} value={this.state.units} onChange={( e ) => { this.onUpdateIngredient( this.props.position, e ); }} /></Table.Cell>
        <Table.Cell><Input name="description" fluid value={this.state.description} onChange={( e ) => { this.onUpdateIngredient( this.props.position, e ); }} /></Table.Cell>
      </Table.Row>
    );
  }
}

export default NewRecipeIngredient;

