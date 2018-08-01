import React, { Component } from 'react';
import { Table, Input } from 'semantic-ui-react';


class Ingredient extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell collapsing><Input type="number" style={{ width: '5rem' }} onChange={e => this.props.onQuantityChange( this.props.quantity, e )} /></Table.Cell>
        <Table.Cell textAlign="right" collapsing>{this.props.multipliedQuantity}</Table.Cell>
        <Table.Cell collapsing>{this.props.units}</Table.Cell>
        <Table.Cell>{this.props.name}</Table.Cell>
      </Table.Row>
    );
  }
}

export default Ingredient;
