import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Recipes from './components/Recipes.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';


class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      isLoggedIn: '',
      userId: '',
      userName: '',
    };
    this.handleAuthState = this.handleAuthState.bind( this );
  }


  componentWillMount() {
    const isLoggedIn = JSON.parse( localStorage.getItem( 'isLoggedIn' ) );
    const userId = localStorage.getItem( 'id' );
    const userName = localStorage.getItem( 'userName' );
    this.setState( {
      isLoggedIn,
      userId,
      userName,
    } );
  }

  handleAuthState( isLoggedIn, userId, userName ) {
    this.setState( { isLoggedIn, userId, userName } );
    localStorage.setItem( 'isLoggedIn', JSON.stringify( isLoggedIn ) );
    localStorage.setItem( 'userId', userId );
    localStorage.setItem( 'userName', userName );
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} handleAuthState={this.handleAuthState} />
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
                      userId="1"
                      key="myrecipes"
                    /> )}
          />
          <Route
            path="/login"
            exact
            render={props =>
                    ( <Login
                      {...props}
                      handleAuthState={this.handleAuthState}
                      rootPath="signin"
                      key="signin"
                    /> )}
          />

          <Route
            path="/register"
            exact
            render={props =>
                    ( <Register
                      {...props}
                      handleAuthState={this.handleAuthState}
                      rootPath="register"
                      key="register"
                    /> )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

