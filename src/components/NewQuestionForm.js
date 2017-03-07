import React, { Component } from 'react';
import { Form, Textarea, Select } from 'react-form';

class NewQuestionForm extends Component {

  validateForm({ user, question }) {
    return {
      user: !user ? `${this.props.userLabel} is required` : undefined,
      question: !question ? 'Question is required' : undefined
    };
  }

  resetForm() {
    this.setValue('user', '');
    this.setValue('question', '');
  }

  submitForm(values, state, props, instance) {
    this.props.onSubmitHandler(values, this.resetForm.bind(instance));
  }

  render() {
    let usersSelectOptions = this.props.usersList.map(user => ({label: user.name, value: user.id}));

    return (
      <Form onSubmit={(values, state, props, instance) => this.submitForm(values, state, props, instance)} validate={this.validateForm.bind(this)}>
        {({submitForm}) => {
          return (
            <div className='card-panel grey lighten-5'>
              <h5 className='center-align'>Submit a new question to a {this.props.userLabel}</h5>
              <form onSubmit={submitForm}>
                <div className='input-field col s12'>
                  <Select field='user' options={usersSelectOptions} className='browser-default' />
                </div>
                <div className='input-field col s12'>
                  <Textarea field='question' placeholder='Type here your question' className='materialize-textarea' />
                </div>
                <button className='btn waves-effect waves-light' type='submit'>Submit</button>
                <p className='FormError'>{this.props.errorMsg}</p>
                <p className='FormSuccess'>{this.props.successMsg}</p>
              </form>
            </div>
          );
        }}
      </Form>
    );
  }
}

export default NewQuestionForm;
