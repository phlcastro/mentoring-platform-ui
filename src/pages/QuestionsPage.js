import React, { Component } from 'react';

import Loading from '../components/Loading';
import MentorsListContainer from '../containers/MentorsListContainer';
import NewQuestionFormContainer from '../containers/NewQuestionFormContainer';
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

    const body = this.props.isLoading ?
                   <Loading />
                 :
                   (
                      <div className='row'>
                        <QuestionsListTableContainer />
                        { this.state.userRole === 'mentee' &&
                          <MentorsListContainer mentorsList={this.props.mentorsList}
                                                availableMentorsList={this.props.availableMentorsList}
                                                updateAllMentorsListCallback={this.props.updateAllMentorsListCallback} /> }
                        {newQuestionFormContainer}
                      </div>
                    );

    return body;
  }
}

export default QuestionsPage;