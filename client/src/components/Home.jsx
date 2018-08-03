import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <Menu.Item as={NavLink} exact to="/new-recipe">Home Page </Menu.Item>
    );
  }
}

export default Home;
