import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Recipes from './components/Recipes.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import NewRecipe from './components/NewRecipe.jsx';


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
    const userId = JSON.parse( localStorage.getItem( 'userId' ) );
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
    localStorage.setItem( 'userId', JSON.stringify( userId ) );
    localStorage.setItem( 'userName', userName );
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} handleAuthState={this.handleAuthState} />
        <div style={{ height: '0.5rem', borderTop: '1px solid #b1d8b9', borderBottom: '1px solid #b1d8b9' }} />
        <Divider hidden />
        <Switch>
          <PrivateRoute
            path="/"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="random"
            key="random"
            cardsPerRow={3}
            userId={this.state.userId}
            component={Recipes}
          />
          <PrivateRoute
            path="/recipes"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="recipes"
            key="recipes"
            cardsPerRow={4}
            component={Recipes}
          />
          <PrivateRoute
            path="/myrecipes"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="myrecipes"
            userId={this.state.userId}
            cardsPerRow={4}
            key="myrecipes"
            component={Recipes}
          />
          <PrivateRoute
            path="/recipe-details/:id"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="recipe-details"
            userId={this.state.userId}
            key="recipe-details"
            component={RecipeDetails}
          />
          <PrivateRoute
            path="/new-recipe"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="new-recipe"
            userId={this.state.userId}
            userName={this.state.userName}
            key="new-recipe"
            component={NewRecipe}
          />
          <PrivateRoute
            path="/edit-recipe/:id"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="new-recipe"
            userId={this.state.userId}
            userName={this.state.userName}
            key="new-recipe"

            component={NewRecipe}
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

