import React, { Component } from 'react';
import sa from 'superagent';

import MyMentorsTable from '../components/MyMentorsTable';
import AddUserMentorForm from '../components/AddUserMentorForm';

class MentorsListContainer extends Component {

  constructor(props){
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      errorMsg: '',
      successMsg: ''
    };
  }

  removeMentor(mentor) {
    sa.del(`${this.API_URL}/users/mentors`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
        mentor_id: mentor
      })
      .end((err, res) => {
        if(res.ok) {
          this.props.updateAllMentorsListCallback();
          this.setState({ successMsg: 'Mentor removed successfully' });
        }
        else {
          let errorDetails = JSON.parse(err.response.text);
          this.setState({ errorMsg: `Something went wrong. ${errorDetails.error}` });
        }
      });
  }

  addMentor(mentor, resetForm) {
    sa.post(`${this.API_URL}/users/mentors`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
        mentor_id: mentor
      })
      .end((err, res) => {
        if(res.ok) {
          this.props.updateAllMentorsListCallback();
          resetForm();
          this.setState({ successMsg: 'Mentor added successfully' });
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
        <div className='card-panel grey lighten-5'>
          <h5 className='center-align'>Mentors</h5>
          <p className='FormError'>{this.state.errorMsg}</p>
          <p className='FormSuccess'>{this.state.successMsg}</p>
          <MyMentorsTable mentorsList={this.props.mentorsList}
                          onSubmitHandler={this.removeMentor.bind(this)}
                          successMsg={this.state.successMsg}
                          errorMsg={this.state.errorMsg} />
          <hr />
          <AddUserMentorForm availableMentorsList={this.props.availableMentorsList}
                             onSubmitHandler={this.addMentor.bind(this)}
                             successMsg={this.state.successMsg}
                             errorMsg={this.state.errorMsg} />
        </div>
      </div>
    );
  }
}

export default MentorsListContainer;