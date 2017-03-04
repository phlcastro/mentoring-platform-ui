import React, { Component } from 'react';

class SignOnForm extends Component {
  render() {
    return (
      <div className='card-panel grey lighten-5'>
        <h5 className='center-align'>Sign On</h5>
        <form>
          <div className='row center-align'>
            <div className='input-field col s12'>
              <input id='first_name' type='text'/>
              <label htmlFor='first_name'>First Name</label>
            </div>
            <div className='input-field col s12'>
              <input id='last_name' type='text'/>
              <label htmlFor='last_name'>Last Name</label>
            </div>
            <div className='input-field col s12'>
              <input id='email' type='email'/>
              <label htmlFor='email'>E-mail</label>
            </div>
            <div className='input-field col s12'>
              <input id='password' type='password'/>
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field col s12'>
              <input id='password_confirmation' type='password'/>
              <label htmlFor='password_confirmation'>Password Confirmation</label>
            </div>
            <div className='col s12 left-align'>
              <label htmlFor='role'>Role</label>
              <select id='role' defaultValue='' className='browser-default'>
                <option value='' disabled='disabled'>Choose your role</option>
                <option value='mentor'>Mentor</option>
                <option value='mentee'>Mentee</option>
              </select>
            </div>
          </div>
          <div className='row center-align'>
            <button className='btn waves-effect waves-light' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignOnForm;