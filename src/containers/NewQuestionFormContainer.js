import React, { Component } from 'react';
import sa from 'superagent';

import NewQuestionForm from '../components/NewQuestionForm';

class NewQuestionFormContainer extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      resetForm: 0,
      errorMsg: '',
      successMsg: ''
    };
  }

  submitNewQuestion({mentor, question}, resetForm) {

    sa.post(`${this.API_URL}/questions`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
        to_user_id: mentor,
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
    let cssClasses = `row ${this.props.className}`;

    return (
      <div className={cssClasses}>
        <div className='col s6'>
          <NewQuestionForm mentorsList={this.props.mentorsList} onSubmitHandler={this.submitNewQuestion.bind(this)} errorMsg={this.state.errorMsg} successMsg={ this.state.successMsg } />
        </div>
      </div>
    );
  }
}

export default NewQuestionFormContainer;