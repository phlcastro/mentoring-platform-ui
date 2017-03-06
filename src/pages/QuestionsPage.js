import React, { Component } from 'react';

import NewQuestionFormContainer from '../containers/NewQuestionFormContainer';

class QuestionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: window.localStorage.getItem('role')
    };
  }

  render() {
    return (
      <NewQuestionFormContainer className={this.state.userRole === 'mentee' ? '' : 'hide'}  mentorsList={this.props.mentorsList}/>
    );
  }
}

export default QuestionsPage;