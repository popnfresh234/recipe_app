import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <div>
        <Header textAlign="center">Random Ideas</Header>
      </div>
    );
  }
}

export default Home;
