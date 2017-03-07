import React, { Component } from 'react';

import NewQuestionFormContainer from '../containers/NewQuestionFormContainer';
import MentorsListContainer from '../containers/MentorsListContainer';

class QuestionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: window.localStorage.getItem('role')
    };
  }

  render() {
    return (
      <div className={`row ${this.state.userRole === 'mentee' ? '' : 'hide'}`}>
        <MentorsListContainer mentorsList={this.props.mentorsList}
                              availableMentorsList={this.props.availableMentorsList}
                              updateAllMentorsListCallback={this.props.updateAllMentorsListCallback} />
        <NewQuestionFormContainer mentorsList={this.props.mentorsList} />
      </div>
    );
  }
}

export default QuestionsPage;