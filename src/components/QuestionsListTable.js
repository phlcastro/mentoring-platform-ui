import React, { Component } from 'react';

class QuestionsListTable extends Component {
  render() {
    const questionsListRows = this.props.questionsList.map(row => {
      return (
        <tr key={row.id}>
          <td>{row.created_at}</td>
          <td>{`${row.mentor.first_name} ${row.mentor.last_name}`}</td>
          <td className='truncate question-col'>{row.description}</td>
          <td className='right-align'>
            <a href='#' onClick={e => { e.preventDefault(); this.props.onCloseQuestion(row.id) }}>close</a>
          </td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mentor</th>
            <th>Question</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {questionsListRows}
        </tbody>
      </table>
    );
  }
}

export default QuestionsListTable;