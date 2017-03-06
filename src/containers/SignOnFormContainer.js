import React, { Component } from 'react';
import { withRouter } from 'react-router';
import sa from 'superagent';

import SignOnForm from '../components/SignOnForm';

class SignOnFormContainer extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = { errorMsg: '' };
  }

  createNewUser(values) {

    sa.post(`${this.API_URL}/users`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .send({
        user: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
          role: values.role
        }
      })
      .end((err, res) => {
        if(res.ok) {
          window.localStorage.setItem('jwt', res.body.jwt);
          window.localStorage.setItem('role', values.role);
          this.props.router.push('/dashboard');
        }
        else {
          let errorDetails = JSON.parse(err.response.text);
          this.setState({ errorMsg: `Something went wrong. ${errorDetails.error}` });
        }
      });
  }

  render() {
    return <SignOnForm onSubmitHandler={this.createNewUser.bind(this)} errorMsg={this.state.errorMsg} />;
  }
}

export default withRouter(SignOnFormContainer);