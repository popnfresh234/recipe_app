import React, { Component } from 'react';
import { Grid, Image, Header, Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Ingredient from './Ingredient.jsx';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipe: '',
    };
  }

  componentDidMount() {
    axios.get( `/api/recipes/${this.props.match.params.id}` )
      .then( ( result ) => {
        const ingredients = result.data.ingredients
          .map( ingredient => ( <Ingredient name={ingredient.name} units={ingredient.units} quantity={ingredient.quantity} /> ) );
        this.setState( {
          recipe: result.data,
          ingredients,
        } );
      } ).catch( ( err ) => {
        console.log( err );
      } );
  }
  render() {
    return (
      <div>
        <Grid stackable columns="equal">
          <Grid.Row>
            <Grid.Column >
              <Image size="medium" centered src={this.state.recipe.image_url} />
            </Grid.Column>
            <Grid.Column className="green-column">
              <Header textAlign="center">{this.state.recipe.name}</Header>
              <Table unstackable compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>INGREDIENTS</Table.Cell>
                  </Table.Row>
                  <br />
                  {this.state.ingredients}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="green-column">
            3
            </Grid.Column>
            <Grid.Column>
             4
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default RecipeDetails;
