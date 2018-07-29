import React, { Component } from 'react';
import { Card, Image, Icon, Grid } from 'semantic-ui-react';

class RecipeOverview extends Component {
  render() {
    const recipe = this.props.recipe;
    console.log( this.props.recipe.image_url );
    return (
      <Card className="recipe-card" fluid>
        <Image fluid src={recipe.image_url} />
        <div className="card-container">
          <h1>{recipe.name}</h1>
          <Card.Meta>{recipe.description}</Card.Meta>
          <hr />
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <span><Icon disabled name="clock outline" /></span> <span> {recipe.duration} minutes </span>
              </Grid.Column>

              <Grid.Column width={8} textAlign="right">
                {recipe.category}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <hr />
        </div>
      </Card>
    );
  }
}

export default RecipeOverview;
