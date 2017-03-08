import React, { Component } from 'react';
import sa from 'superagent';

import Header from '../components/Header';
import Loading from '../components/Loading';

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_ENDPOINT;

    this.state = {
      isLoading: true,
      renderChildren: false,
      mentorsList: [],
      menteesList: [],
      availableMentorsList: []
    };
  }

  updateMentorsList() {
    return sa.get(`${this.API_URL}/users/mentors`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`);
  }

  updateAvailableMentorsList() {
    return sa.get(`${this.API_URL}/users/mentors`)
      .query({ available: 1 })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/mentoring-platform-v1')
      .set('Authorization', `Bearer ${window.localStorage.getItem('jwt')}`);
  }

  updateAllMentorsList() {
    Promise.all([this.updateMentorsList(), this.updateAvailableMentorsList()]).then((responses) => {
      let umlResponse = responses[0];
      let uamlResponse = responses[1];

      if(umlResponse.ok) {
        this.setState({
          mentorsList: umlResponse.body.mentors.map(mentor => ({ id: mentor.id, name: `${mentor.first_name} ${mentor.last_name}`}))
        });
      }

     if(uamlResponse.ok) {
        this.setState({
          availableMentorsList: uamlResponse.body.mentors.map(mentor => ({ id: mentor.id, name: `${mentor.first_name} ${mentor.last_name}`}))
        });
      }

      this.setState({ renderChildren: true, isLoading: false });
    }).catch(() => {
      this.setState({ isLoading: false, errorMsg: `Something went wrong.` });
    });
  }

  componentDidMount() {
    this.updateAllMentorsList();
  }

  render() {
    let children = React.Children.map(this.props.children,
                                      child => React.cloneElement(child, {
                                        isLoading: this.state.isLoading,
                                        mentorsList: this.state.mentorsList,
                                        menteesList: this.state.menteesList,
                                        availableMentorsList: this.state.availableMentorsList,
                                        updateAllMentorsListCallback: this.updateAllMentorsList.bind(this)
                                      }));
    return (
      <div>
        <Header />
        <p className='FormError'>{this.state.errorMsg}</p>
        {this.state.isLoading ? <Loading /> : (this.state.renderChildren ? children : '')}
      </div>
    );
  }
}

export default DashboardPage;