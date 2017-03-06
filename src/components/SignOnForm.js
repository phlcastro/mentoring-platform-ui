import React, { Component } from 'react';
import { Form, Text, Select } from 'react-form';

class SignOnForm extends Component {
  submitForm(values) {
    this.props.onSubmitHandler(values);
  }

  validateForm({ first_name, last_name, email, password, password_confirmation, role }) {
    let password_confirmation_test = undefined;

    if(!password_confirmation) {
      password_confirmation_test = 'Password confirmation is required';
    } else if(password && (password !== password_confirmation)) {
      password_confirmation_test = 'Password confirmation does not match password';
    }

    return {
      first_name: !first_name ? 'First name is required' : undefined,
      last_name: !last_name ? 'Last name is required' : undefined,
      email: !email ? 'Email is required' : undefined,
      password: !password ? 'Password is required' : undefined,
      password_confirmation: password_confirmation_test,
      role: !role ? 'Role is required' : undefined
    };
  }

  render() {
    return (
      <Form onSubmit={values => this.submitForm(values)} validate={this.validateForm}>
        {({submitForm}) => {
          return (
            <div className='card-panel grey lighten-5'>
              <h5 className='center-align'>Sign On</h5>
              <form onSubmit={submitForm}>
                <div className='row center-align'>
                  <div className='input-field col s12'>
                    <Text field='first_name' placeholder='First Name' />
                  </div>
                  <div className='input-field col s12'>
                    <Text field='last_name' placeholder='Last Name' />
                  </div>
                  <div className='input-field col s12'>
                    <Text field='email' placeholder='Email' type='email' />
                  </div>
                  <div className='input-field col s12'>
                    <Text field='password' placeholder='Password' type='password' />
                  </div>
                  <div className='input-field col s12'>
                    <Text field='password_confirmation' placeholder='Password Confirmation' type='password' />
                  </div>
                  <div className='col s12'>
                    <Select field='role' options={ [{label: 'Choose Your Role', value: ''}, {label: 'Mentor', value: 'mentor'}, {label: 'Mentee', value: 'mentee'}] } className='browser-default' />
                  </div>
                </div>
                <div className='row center-align'>
                  <button className='btn waves-effect waves-light' type='submit'>Submit</button>
                  <p className='FormError'>{this.props.errorMsg}</p>
                </div>
              </form>
            </div>
          );
        }}
      </Form>
    );
  }
}

export default SignOnForm;
