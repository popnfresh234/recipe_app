import React, { Component } from 'react';
import { Card, Image, Divider, Grid, Container } from 'semantic-ui-react';

class RecipeOverview extends Component {
  render() {
    const recipe = this.props.recipe;
    console.log( this.props.recipe.image_url );
    return (
      <Card fluid>
        <Image fluid src={recipe.image_url} />
        <div className="card-container">
          <Card.Header>{recipe.name}</Card.Header>
          <Card.Meta>{recipe.description}</Card.Meta>
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <p>Test</p>
              </Grid.Column>

              <Grid.Column width={8} textAlign="right">
                {recipe.category}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
        </div>
      </Card>
    );
  }
}

export default RecipeOverview;
