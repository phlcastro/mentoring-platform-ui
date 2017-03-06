/*global $*/
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import sa from 'superagent';

import SignInForm from '../components/SignInForm';

class SignInFormContainer extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = { errorMsg: '' };
  }

  authenticateUser({email, password}) {

    sa.post(`${this.API_URL}/user_token`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .send({
        auth: {
          email: email,
          password: password
        }
      })
      .end((err, res) => {
        if(res.ok) {
          window.localStorage.setItem('jwt', res.body.jwt);
          this.props.router.push('/dashboard');
        }
        else {
          if(res.notFound) {
            this.setState({ errorMsg: 'Email and/or password invalid. Please try again.' });
          }
          else {
            this.setState({ errorMsg: `Something went wrong. ${err.response}` });
          }
        }
      });
  }

  render() {
    return <SignInForm onSubmitHandler={this.authenticateUser.bind(this)} errorMsg={this.state.errorMsg} />;
  }
}

export default withRouter(SignInFormContainer);