import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';

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
    const { activeItem } = this.state;
    return (
      <div>
        <Menu stackable pointing secondary>
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name="all recipes" active={activeItem === 'all recipes'} onClick={this.handleItemClick} />
          <Menu.Item name="my recipes" active={activeItem === 'my recipes'} onClick={this.handleItemClick} />
          <Menu.Item name="random!" active={activeItem === 'random!'} onClick={this.handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="food" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item name={this.props.isLoggedIn ? 'Log out' : 'Sign in'} onClick={this.handleSignInButton} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
