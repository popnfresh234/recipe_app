import React, { Component } from 'react';
import axios from 'axios';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

/* eslint class-methods-use-this: 0 */ // --> OFF
class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      searchTerm: '',
      redirect: false,
    };
    this.handleLogout = this.handleLogout.bind( this );
    this.onSearchChange = this.onSearchChange.bind( this );
    this.onKeyPress = this.onKeyPress.bind( this );
  }

  onSearchChange( e ) {
    this.setState( {
      [e.target.name]: e.target.value,
    } );
  }

  onKeyPress( e ) {
    if ( e.key === 'Enter' && this.state.searchTerm ) {
      const redirect = `/search?q=${this.state.searchTerm}`;
      this.props.history.push( redirect );
      // axios.get( `/api/recipes/search?q=${this.state.searchTerm}` )
      //   .then( ( results ) => {
      //     console.log( results.data );
      //   } ).catch( ( err ) => {
      //     console.log( err );
      //   } );
    }
  }

  handleLogout() {
    this.props.handleLoading();
    axios.post( '/api/logout' )
      .then( ( ) => {
        this.props.handleLoading();
        this.props.handleAuthState( false, null, null );
        this.props.history.push( '/' );
      } ).catch( ( err ) => {
        this.props.handleLoading();
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
              <Input icon="food" placeholder="Search..." name="searchTerm" value={this.state.searchTerm} onChange={this.onSearchChange} onKeyPress={this.onKeyPress} />
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
