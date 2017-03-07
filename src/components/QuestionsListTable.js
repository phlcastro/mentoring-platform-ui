import React, { Component } from 'react';
import { Link } from 'react-router';

class QuestionsListTable extends Component {
  render() {
    const questionsListRows = this.props.questionsList.map(row => {
      return (
        <tr key={row.id}>
          <td>{row.created_at}</td>
          <td>{`${row.from_user.first_name} ${row.from_user.last_name}`}</td>
          <td>{`${row.to_user.first_name} ${row.to_user.last_name}`}</td>
          <td className='truncate question-col'>{row.description}</td>
          <td className='right-align'>
            <Link to={`/dashboard/questions/${row.id}`}>view</Link>
            &nbsp; | &nbsp;
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
            <th>From</th>
            <th>To</th>
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