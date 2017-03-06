import React, { Component } from 'react';
import { Form, Text } from 'react-form';

class SignInForm extends Component {
  submitForm(values) {
    this.props.onSubmitHandler(values);
  }

  validateForm({ email, password }) {
    return {
      email: !email ? 'E-mail is required' : undefined,
      password: !password ? 'Password is required' : undefined
    };
  }

  render() {
    return (
      <Form onSubmit={values => this.submitForm(values)} validate={this.validateForm}>
        {({submitForm}) => {
          return (
            <div className='card-panel grey lighten-5'>
              <h5 className='center-align'>Sign In</h5>
              <div className='row center-align'>
                <form onSubmit={submitForm}>
                  <div className='input-field col s12'>
                    <Text field='email' placeholder='E-mail' />
                  </div>
                  <div className='input-field col s12'>
                    <Text field='password' placeholder='Password' type='password' />
                  </div>
                  <button className='btn waves-effect waves-light' type='submit'>Submit</button>
                  <p className='FormError'>{this.props.errorMsg}</p>
                </form>
              </div>
            </div>
          );
        }}
      </Form>
    );
  }
}

export default SignInForm;
