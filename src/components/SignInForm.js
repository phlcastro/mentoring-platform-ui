import React, { Component } from 'react';

class SignInForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div className='card-panel grey lighten-5'>
        <h5 className='center-align'>Sign In</h5>
        <div className='row center-align'>
          <div className='input-field col s12'>
            <input id='email' type='email' onChange={ e => this.setState({ email: e.target.value }) } />
            <label htmlFor='email'>E-mail</label>
          </div>
          <div className='input-field col s12'>
            <input id='password' type='password' onChange={ e => this.setState({ password: e.target.value }) } />
            <label htmlFor='password'>Password</label>
          </div>
          <button className='btn waves-effect waves-light'
            onClick={e => this.props.onSubmitHandler(this.state.email, this.state.password)}>Submit</button>
          <p className='FormError'>{this.props.errorMsg}</p>
        </div>
      </div>
    );
  }
}

export default SignInForm;
