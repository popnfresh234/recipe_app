import React, { Component } from 'react';
import { Input, Form, Table } from 'semantic-ui-react';


class NewRecipeDirection extends Component {
  constructor( props ) {
    super( props );
    this.onUpdateDirection = this.onUpdateDirection.bind( this );
    this.direction = {
      id: this.props.id,
      description: this.props.description,
    };
    this.state = {
      description: this.props.description,
    };
  }

  onUpdateDirection( e ) {
    this.direction[e.target.name] = e.target.value;
    this.setState( {
      [e.target.name]: e.target.value,
    } );
    this.props.updateDirection( this.direction, this.props.position );
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell><Form className="direction-text-area"><Form.TextArea value={this.state.description} name="description" onChange={this.onUpdateDirection} /></Form></Table.Cell>
      </Table.Row> );
  }
}

export default NewRecipeDirection;

