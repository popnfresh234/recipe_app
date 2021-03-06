/* eslint class-methods-use-this: 0 */ // --> OFF
import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Grid, Image, Header, Table, List, Button } from 'semantic-ui-react';
import axios from 'axios';
import Ingredient from './Ingredient.jsx';
import Direction from './Direction.jsx';
import DeleteModal from './DeleteModal.jsx';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipe: '',
      deleted: false,
    };
    this.onQuantityChange = this.onQuantityChange.bind( this );
    this.onDelete = this.onDelete.bind( this );
  }


  componentDidMount() {
    this.props.handleLoading();
    axios.get( `/api/recipes/${this.props.computedMatch.params.id}` )
      .then( ( result ) => {
        this.props.handleLoading();
        const ingredients = this.calcIngredients( result.data.ingredients, 1 );

        const directions = result.data.directions
          .map( direction => ( <Direction
            key={direction.id}
            description={direction.description}
          /> ) );
        this.setState( {
          recipe: result.data,
          rawIngredients: result.data.ingredients,
          ingredients,
          directions,
        } );
      } ).catch( ( err ) => {
        this.props.handleLoading();
        console.log( err );
      } );
  }

  onQuantityChange( origValue, e ) {
    let multiplier = e.target.value / origValue;
    if ( multiplier <= 0 ) {
      multiplier = 1;
    }
    const ingredients = this.calcIngredients( this.state.rawIngredients, multiplier );
    this.setState( { ingredients } );
  }

  onDelete() {
    this.props.handleLoading();
    axios.delete( `/api/recipes/${this.props.computedMatch.params.id}` )
      .then( () => {
        this.props.handleLoading();
        this.setState( {
          deleted: true,
        } );
      } ).catch( ( err ) => {
        this.props.handleLoading();
        console.log( err );
      } );
  }

  calcIngredients( ingredients, multiplier ) {
    return ingredients
      .map( ingredient => ( <Ingredient
        key={ingredient.id}
        name={ingredient.name}
        units={ingredient.units}
        quantity={ingredient.quantity}
        multipliedQuantity={ingredient.quantity * multiplier}
        onQuantityChange={this.onQuantityChange}
      /> ) );
  }


  render() {
    const rowStyle = {
      paddingTop: 0,
      paddingBottom: 0,
    };

    const columnStyle = {
      paddingRight: '2rem',
      paddingTop: '2rem',
      paddingBottom: '2rem',
    };

    const leftColumnStyle = {
      ...columnStyle,
      paddingLeft: '2rem',
    };


    return (

      <Grid className="recipe-detail-grid" stackable columns="equal">
        {this.state.deleted && <Redirect to="/recipes" />}
        <Grid.Row >
          <Grid.Column verticalAlign="middle" style={columnStyle} >
            <Image size="medium" centered src={this.state.recipe.image_url} />
          </Grid.Column>
          <Grid.Column className="green-column" style={columnStyle}>
            {this.state.recipe.user_id === this.props.userId &&
            <span className="recipe-detail-edit-button-container">
              <Button as={NavLink} to={`/edit-recipe/${this.props.computedMatch.params.id}`}>EDIT</Button>
              <DeleteModal onDelete={this.onDelete} />
            </span>
            }
            <Header id="header-recipe-title">{this.state.recipe.name}</Header>
            <Header textAlign="center" size="tiny" id="header-author">By {this.state.recipe.author}</Header>
            <Header>INGREDIENTS</Header>
            <Table unstackable compact>
              <Table.Body>

                {this.state.ingredients}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={rowStyle}>
          <Grid.Column className="green-column" style={leftColumnStyle}>
            <Header>DIRECTIONS</Header>
            <List ordered>
              {this.state.directions}
            </List>
          </Grid.Column>
          <Grid.Column style={columnStyle}>
            <Header>Notes</Header>
            {this.state.recipe.note}
          </Grid.Column>
        </Grid.Row>
      </Grid>

    );
  }
}

export default RecipeDetails;
