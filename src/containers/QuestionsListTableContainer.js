import React, { Component } from 'react';
import sa from 'superagent';

import Loading from '../components/Loading';
import QuestionsListTable from '../components/QuestionsListTable';

class QuestionsListTableContainer extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      isLoading: true,
      questionsList: [],
      errorMsg: '',
      successMsg: ''
    };
  }

  updateQuestionsList() {
    sa.get(`${this.API_URL}/questions`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .end((err, res) => {
        if(res.ok) {
          this.setState({
            isLoading: false,
            questionsList: res.body.questions
          });
        }
        else {
          this.setState({ errorMsg: `Something went wrong. ${err.response}` });
        }
      });
  }

  closeQuestion(question) {
    sa.patch(`${this.API_URL}/questions/${question}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
        question: { status: 'closed' }
      })
      .end((err, res) => {
        if(res.ok) {
          this.updateQuestionsList();
          this.setState({ successMsg: 'Question closed successfully' });
        }
        else {
          let errorDetails = JSON.parse(err.response.text);
          this.setState({ errorMsg: `Something went wrong. ${errorDetails.error}` });
        }
      });
  }

  componentDidMount() {
    this.updateQuestionsList();
  }

  render() {
    return(
      <div className='col s12'>
        <h4 className='center-align'>Questions</h4>
        <p className='FormError'>{this.state.errorMsg}</p>
        <p className='FormSuccess'>{this.state.successMsg}</p>
        <div className='card-panel grey lighten-5'>
          {
            this.state.isLoading ?
              <Loading />
            :
              <QuestionsListTable questionsList={this.state.questionsList} onCloseQuestion={this.closeQuestion.bind(this)} />
          }
        </div>
      </div>
    );
  }
}

export default QuestionsListTableContainer;
