import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';

class Login extends Component {
  render() {
    return (
      <div>
        <Header size="huge" textAlign="center" className="login-header">BIG COOKIN' </Header>
        <Header id="login-subheader" sub textAlign="center">Sharing recipes for a better world</Header>
        <Segment id="login-segment" padded="very">
          <Form inverted>
            <Form.Field required>
              <label>Email</label>
              <input placeholder="Email" />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input placeholder="Password" />
            </Form.Field>
            <div className="login-button-div">
              <Button type="submit">Sign in!</Button>
            </div>
          </Form>
        </Segment>
      </div>


    );
  }
}

export default Login;
