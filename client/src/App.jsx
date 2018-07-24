import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Route, Switch } from 'react-router-dom';

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
      <div>
        <Navbar handleAuthState={this.handleAuthState} isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;

