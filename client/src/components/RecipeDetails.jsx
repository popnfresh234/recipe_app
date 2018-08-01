import React, { Component } from 'react';
import { Card, Image, Icon, Grid } from 'semantic-ui-react';

class RecipeDetails extends Component {
  render() {
    console.log( this.props );
    return (
      <p>{`Recipe Details ${this.props.match.params.id}`}</p>
    );
  }
}

export default RecipeDetails;
