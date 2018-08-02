import React, { Component } from 'react';
import { List } from 'semantic-ui-react';


class Direction extends Component {
  render() {
    return (
      <List.Item>{this.props.description}</List.Item>
    );
  }
}

export default Direction;

