import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';

class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      id: '',
      error: '',
    };
    this.onChange = this.onChange.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }
  onChange( e ) {
    this.setState( {
      [e.target.name]: e.target.value,
    } );
  }

  onSubmit( e ) {
    e.preventDefault();
    fetch( '/api/login', {
      method: 'POST',
      body: JSON.stringify( this.state ),
      headers: new Headers( {
        'Content-Type': 'application/json',
      } ),
      credentials: 'same-origin',
    } )
      .then( response => response.json() )
      .then( ( data ) => {

      } );
  }
  render() {
    return (
      <div>
        <Header size="huge" textAlign="center" className="login-header">BIG COOKIN' </Header>
        <Header id="login-subheader" sub textAlign="center">Sharing recipes for a better world</Header>
        <Segment id="login-segment" padded="very">
          <Form inverted onSubmit={this.onSubmit}>
            {this.state.error && <Message
              content={this.state.error}
            />}
            <Form.Input label="Email" placeholder="Email" name="email" type="email" onChange={this.onChange} required />
            <Form.Input label="Password" placeholder="Password" name="password" type="password" onChange={this.onChange} required />
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
