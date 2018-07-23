import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';

/* eslint class-methods-use-this: 0 */ // --> OFF
class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.state = { activeItem: 'home' };
    this.handleItemClick = this.handleItemClick.bind( this );
    this.handleLogout = this.handleLogout.bind( this );
  }

  handleItemClick( e, target ) {
    this.setState( {
      activeItem: target.name,
    } );
  }

  handleLogout() {
    fetch( '/api/logout', {
      method: 'POST',
      credentials: 'same-origin',
    } ).then( ( result ) => {
      console.log( result );
    } ).catch( ( err ) => {
      console.log( err );
    } );
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
            <Menu.Item name="Logout" onClick={this.handleLogout} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
