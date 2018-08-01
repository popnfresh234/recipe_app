import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


class Ingredient extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell textAlign="right" collapsing>{this.props.quantity}</Table.Cell>
        <Table.Cell collapsing>{this.props.units}</Table.Cell>
        <Table.Cell>{this.props.name}</Table.Cell>
      </Table.Row>
    );
  }
}

export default Ingredient;
