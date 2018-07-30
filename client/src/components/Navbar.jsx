import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/* eslint class-methods-use-this: 0 */ // --> OFF
class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.state = { activeItem: 'home' };
  }


  render() {
    return (
      <div>
        <Menu size="large" stackable secondary>
          <Menu.Item as={NavLink} name="home" exact to="/" />
          <Menu.Item as={NavLink} name="all recipes" to="/recipes" />
          <Menu.Item as={NavLink} name="my recipes" to="/myrecipes" />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="food" placeholder="Search..." />
            </Menu.Item>
            {this.props.isLoggedIn && <Menu.Item as={NavLink} name="Log out" to="/" />}
            {!this.props.isLoggedIn && <Menu.Item as={NavLink} name="Sign in" to="/login" /> }
            {!this.props.isLoggedIn && <Menu.Item as={NavLink} name="Register" to="/register" /> }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
