import React, { Component } from 'react';
import SignInFormContainer from '../containers/SignInFormContainer';
import SignOnFormContainer from '../containers/SignOnFormContainer';

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
            <SignOnFormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default UserAuthenticationPage;
