import React, { Component } from 'react';
import { Input, Table } from 'semantic-ui-react';


class NewRecipeIngredient extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell collapsing><Input style={{ width: '4rem' }} /></Table.Cell>
        <Table.Cell collapsing><Input style={{ width: '4rem' }} /></Table.Cell>
        <Table.Cell><Input fluid /></Table.Cell>
      </Table.Row>
    );
  }
}

export default NewRecipeIngredient;

