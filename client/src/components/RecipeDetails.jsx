import React, { Component } from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import axios from 'axios';


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
        console.log( result );
        this.setState( {
          recipe: result.data,
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
