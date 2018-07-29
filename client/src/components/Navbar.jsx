import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/* eslint class-methods-use-this: 0 */ // --> OFF
class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.state = { activeItem: 'home' };
    this.handleItemClick = this.handleItemClick.bind( this );
    this.handleSignInButton = this.handleSignInButton.bind( this );
  }

  handleItemClick( e, target ) {
    this.setState( {
      activeItem: target.name,
    } );
  }

  handleSignInButton( ) {
    if ( this.props.isLoggedIn ) {
      fetch( '/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
      } ).then( ( result ) => {
        this.props.handleAuthState( false );
      } ).catch( ( err ) => {
        console.log( err );
      } );
    } else {
      fetch( '/api/login', {
        method: 'POST',
        body: JSON.stringify( {
          email: 'ajhollid@gmail.com',
          password: 'test',
        } ),
        headers: new Headers( {
          'Content-Type': 'application/json',
        } ),
        credentials: 'same-origin',
      } ).then( ( result ) => {
        this.props.handleAuthState( true );
      } ).catch( ( err ) => {
        console.log( err );
      } );
    }
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
            {this.props.isLoggedIn && <Menu.Item name="Log out" onClick={this.handleSignInButton} />}
            {!this.props.isLoggedIn && <Menu.Item name="Sign in" onClick={this.handleSignInButton} /> }
            {!this.props.isLoggedIn && <Menu.Item as={NavLink} name="Register" to="/register" /> }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
