import React, { Component } from 'react';

import NewQuestionFormContainer from '../containers/NewQuestionFormContainer';
import MentorsListContainer from '../containers/MentorsListContainer';
import QuestionsListTableContainer from '../containers/QuestionsListTableContainer';

class QuestionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: window.localStorage.getItem('role')
    };
  }

  render() {
    let newQuestionFormContainer = '';

    if(this.state.userRole === 'mentee') {
      newQuestionFormContainer = (
        <NewQuestionFormContainer usersList={this.props.mentorsList} userLabel='Mentor' />
      );
    }
    else {
      newQuestionFormContainer = (
        <NewQuestionFormContainer usersList={this.props.menteesList} userLabel='Mentee' />
      );
    }

    return (
      <div className='row'>
        <QuestionsListTableContainer />
        { this.state.userRole === 'mentee' &&
          <MentorsListContainer mentorsList={this.props.mentorsList}
                                availableMentorsList={this.props.availableMentorsList}
                                updateAllMentorsListCallback={this.props.updateAllMentorsListCallback} /> }
        {newQuestionFormContainer}
      </div>
    );
  }
}

export default QuestionsPage;