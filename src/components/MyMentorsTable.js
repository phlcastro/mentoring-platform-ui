import React, { Component } from 'react';

class MyMentorsTable extends Component {

  render() {
    const mentorsListRows = this.props.mentorsList.map(row => {
      return (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td className='right-align'>
            <a href='#' onClick={e => { e.preventDefault(); this.props.onSubmitHandler(row.id) }}>remove</a>
          </td>
        </tr>
      );
    });

    return (
      <div className='row'>
        <div className='col s12'>
          <table>
            <thead>
              <tr>
                <th>My Mentors</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mentorsListRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyMentorsTable;