import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Recipes from './components/Recipes.jsx';


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
        <Divider hidden />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/recipes"
            exact
            render={props =>
                    ( <Recipes
                      {...props}
                      rootPath="recipes"
                      key="recipes"
                    /> )}
          />
          <Route
            path="/myrecipes"
            exact
            render={props =>
                    ( <Recipes
                      {...props}
                      rootPath="myrecipes"
                      key="myrecipes"
                    /> )}
          />
          <Route
            path="/random"
            exact
            render={props =>
                    ( <Recipes
                      {...props}
                      rootPath="random"
                      key="random"
                    /> )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

