import React, { Component } from 'react';
import sa from 'superagent';

import NewQuestionForm from '../components/NewQuestionForm';

class NewQuestionFormContainer extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      errorMsg: '',
      successMsg: ''
    };
  }

  submitNewQuestion({user, question}, resetForm) {

    sa.post(`${this.API_URL}/questions`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
        to_user_id: user,
        description: question
      })
      .end((err, res) => {
        if(res.ok) {
          resetForm();
          this.setState({ successMsg: 'Question submitted successfully'});
        }
        else {
          let errorDetails = JSON.parse(err.response.text);
          this.setState({ errorMsg: `Something went wrong. ${errorDetails.error}` });
        }
      });
  }

  render() {
    return (
      <div className='col s6'>
        {
          this.props.usersList.length > 0 &&
          <NewQuestionForm usersList={this.props.usersList} userLabel={this.props.userLabel} onSubmitHandler={this.submitNewQuestion.bind(this)} errorMsg={this.state.errorMsg} successMsg={ this.state.successMsg } />
        }
      </div>
    );
  }
}

export default NewQuestionFormContainer;