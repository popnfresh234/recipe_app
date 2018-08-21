import React, { Component } from 'react';
import axios from 'axios';
import { Header, Segment, Form, Button, Message } from 'semantic-ui-react';

class Register extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
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
    if ( this.state.password !== this.state.confirmPassword ) {
      this.setState( { error: 'Your passwords don\'t match, please try again.' } );
    } else {
      this.props.handleLoading();
      axios.post( '/api/register', this.state )
        .then( ( registerResponse ) => {
          this.props.handleLoading();
          this.props.handleAuthState( true, registerResponse.data.id, registerResponse.data.name );
          this.props.history.push( '/recipes' );
        } ).catch( ( err ) => {
          this.props.handleLoading();
          console.log( err.response );
          this.setState( {
            error: err.response.data,
          } );
        } );
    }
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
            <Form.Input label="Name" placeholder="Name" name="username" type="text" onChange={this.onChange} required />
            <Form.Input label="Email" placeholder="Email" name="email" type="email" onChange={this.onChange} required />
            <Form.Input label="Password" placeholder="Password" name="password" type="password" onChange={this.onChange} required />
            <Form.Input label="Confirm Password" placeholder="Confirm Password" name="confirmPassword" onChange={this.onChange} type="password" required />
            <div className="login-button-div">
              <Button type="submit">Register!</Button>
            </div>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default Register;
