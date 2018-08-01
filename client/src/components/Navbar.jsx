import React, { Component } from 'react';
import axios from 'axios';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';

/* eslint class-methods-use-this: 0 */ // --> OFF
class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.state = { activeItem: 'home' };
    this.handleLogout = this.handleLogout.bind( this );
  }

  handleLogout() {
    axios.post( '/api/logout' )
      .then( ( ) => {
        this.props.handleAuthState( false, null, null );
        this.props.history.push( '/' );
      } ).catch( ( err ) => {
        console.log( err );
      } );
  }


  render() {
    return (
      <div>
        <Menu size="large" stackable secondary>
          <Menu.Item as={NavLink} name="home" exact to="/" />
          {this.props.isLoggedIn && <Menu.Item as={NavLink} name="all recipes" to="/recipes" />}
          {this.props.isLoggedIn && <Menu.Item as={NavLink} name="my recipes" to="/myrecipes" />}
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="food" placeholder="Search..." />
            </Menu.Item>
            {this.props.isLoggedIn && <Menu.Item as="a" name="Log out" onClick={this.handleLogout} />}
            {!this.props.isLoggedIn && <Menu.Item as={NavLink} name="Sign in" to="/login" /> }
            {!this.props.isLoggedIn && <Menu.Item as={NavLink} name="Register" to="/register" /> }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default withRouter( Navbar );
