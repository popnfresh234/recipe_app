import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Card, Image, Icon, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class RecipeOverview extends Component {
  render() {
    const recipe = this.props.recipe;

    return (
      <Card className="recipe-card" fluid as={NavLink} to={`/recipe-details/${this.props.recipe.id}`}>

        <Image src={recipe.image_url} />

        <div className="card-container">
          <h1 style={{ height: '5rem', lineHeight: '2.1rem', textAlign: 'center' }}>
            <LinesEllipsis
              text={recipe.name}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </h1>
          <Card.Meta>{recipe.description}</Card.Meta>
          <hr />
          <Grid >
            <Grid.Row>
              <Grid.Column width={8}>
                <span><Icon disabled className="clock outline" /></span> <span> {recipe.duration} minutes </span>
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
