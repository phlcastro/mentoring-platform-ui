import React, { Component } from 'react';
import SignInFormContainer from '../containers/SignInFormContainer';
import SignOnForm from '../components/SignOnForm';

class UserAuthenticationPage extends Component {
  render() {
    return (
      <div>
        <div className='row'>
          <h3 className='center-align'>Mentoring Platform</h3>
        </div>
        <div className='row'>
          <div className='col s6 offset-s3'>
            <SignInFormContainer />
          </div>
        </div>
        <p className='center-align'>or</p>
        <div className='row'>
          <div className='col s6 offset-s3'>
            <SignOnForm />
          </div>
        </div>
      </div>
    );
  }
}

export default UserAuthenticationPage;