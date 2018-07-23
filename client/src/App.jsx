import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = { isLoggedIn: false };
    this.handleAuthState = this.handleAuthState.bind( this );
  }

  handleAuthState( isLoggedIn, userId, userName ) {
    this.setState( { isLoggedIn, userId, userName } );
  }

  render() {
    return (
      <Navbar handleAuthState={this.handleAuthState} isLoggedIn={this.state.isLoggedIn} />
    );
  }
}

export default App;

