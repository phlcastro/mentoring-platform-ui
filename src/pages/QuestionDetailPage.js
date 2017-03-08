import React, { Component } from 'react';
import sa from 'superagent';

import Loading from '../components/Loading';
import NewAnswerForm from '../components/NewAnswerForm';

class QuestionDetailPage extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      isLoading: true,
      questionDetails: {},
      errorMsg: '',
      successMsg: ''
    };
  }

  loadQuestionDetails() {
    let questionId = this.props.params.id;

    sa.get(`${this.API_URL}/questions/${questionId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
      })
      .end((err, res) => {
        if(res.ok) {
          this.setState({
            questionDetails: res.body.question,
            isLoading: false
          });
        }
        else {
          this.setState({ errorMsg: `Something went wrong. ${err.response}` });
        }
      });
  }

  addAnswer({answer}, resetForm){
    let questionId = this.props.params.id;

    sa.post(`${this.API_URL}/questions/${questionId}/answers`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
        answer: { description: answer }
      })
      .end((err, res) => {
        if(res.ok) {
          this.loadQuestionDetails();
          resetForm();
          this.setState({ successMsg: 'Answer added successfully' });
        }
        else {
          console.log(err.response.text);
          let errorDetails = JSON.parse(err.response.text);
          this.setState({ errorMsg: `Something went wrong. ${errorDetails.error}` });
        }
      });
  }

  componentDidMount() {
    this.loadQuestionDetails();
  }

  render() {
    let body = '';

    if (this.state.isLoading) {
      body = (
        <Loading />
      );
    }
    else {
      let answers = this.state.questionDetails.answers.map(row => {
        return (
          <div key={row.id} className='col s12'>
            <div className='card-panel grey lighten-5'>
              <p><strong>Answered by: </strong>{row.user.first_name} {row.user.last_name}</p>
              <strong>At: </strong>{row.created_at}
              <p>{row.description}</p>
            </div>
          </div>
        );
      });

      body = (
        <div className='row'>
          <h4 className='center-align'>Question Details</h4>
          <div className='col s12'>
            <div className='card-panel grey lighten-5'>
              <h5>From: {this.state.questionDetails.from_user.first_name} {this.state.questionDetails.from_user.last_name}</h5>
              <h5>To: {this.state.questionDetails.to_user.first_name} {this.state.questionDetails.to_user.last_name}</h5>
              <p><strong>Sent at: </strong>{this.state.questionDetails.created_at}</p>
              <p><strong>Question:</strong></p>
              <p>{this.state.questionDetails.description}</p>
            </div>
          </div>
          {answers}
          <div className='col s12'>
            <p className='FormError'>{this.state.errorMsg}</p>
            <p className='FormSuccess'>{this.state.successMsg}</p>
            <NewAnswerForm onSubmitHandler={this.addAnswer.bind(this)} />
          </div>
        </div>
      );
    }

    return body;
  }
}

export default QuestionDetailPage;
