import React, { Component } from 'react';
import sa from 'superagent';

import Header from '../components/Header';

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      mentorsList: [],
      menteesList: [],
      availableMentorsList: []
    };
  }

  updateMentorsList() {
    sa.get(`${this.API_URL}/users/mentors`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
      })
      .end((err, res) => {
        if(res.ok) {
          this.setState({
            mentorsList: res.body.mentors.map(mentor => ({ id: mentor.id, name: `${mentor.first_name} ${mentor.last_name}`}))
          });
        }
        else {
          this.setState({ errorMsg: `Something went wrong. ${err.response}` });
        }
      });
  }

  updateAvailableMentorsList() {
    sa.get(`${this.API_URL}/users/mentors`)
      .query({ available: 1 })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
      .send({
      })
      .end((err, res) => {
        if(res.ok) {
          this.setState({
            availableMentorsList: res.body.mentors.map(mentor => ({ id: mentor.id, name: `${mentor.first_name} ${mentor.last_name}`}))
          });
        }
        else {
          this.setState({ errorMsg: `Something went wrong. ${err.response}` });
        }
      });
  }

  updateAllMentorsList() {
    this.updateMentorsList();
    this.updateAvailableMentorsList();
  }

  componentDidMount() {
    this.updateAllMentorsList();
  }

  render() {
    let children = React.Children.map(this.props.children,
                                      child => React.cloneElement(child, {
                                        mentorsList: this.state.mentorsList,
                                        menteesList: this.state.menteesList,
                                        availableMentorsList: this.state.availableMentorsList,
                                        updateAllMentorsListCallback: this.updateAllMentorsList.bind(this)
                                      }));
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

export default DashboardPage;