import React, { Component } from 'react';
import { Form, Textarea, Select } from 'react-form';

class NewQuestionForm extends Component {

  validateForm({ mentor, question }) {
    return {
      mentor: !mentor ? 'Mentor is required' : undefined,
      question: !question ? 'Question is required' : undefined
    };
  }

  resetForm() {
    this.setValue('mentor', '');
    this.setValue('question', '');
  }

  submitForm(values, state, props, instance) {
    this.props.onSubmitHandler(values, this.resetForm.bind(instance));
  }

  render() {
    let mentorsSelectOptions = this.props.mentorsList.map(mentor => ({label: mentor.name, value: mentor.id}));

    return (
      <Form onSubmit={(values, state, props, instance) => this.submitForm(values, state, props, instance)} validate={this.validateForm}>
        {({submitForm}) => {
          return (
            <div className='card-panel grey lighten-5'>
              <h5 className='center-align'>Submit a new question to a mentor</h5>
              <form onSubmit={submitForm}>
                <div className='input-field col s12'>
                  <Select field='mentor' options={mentorsSelectOptions} className='browser-default' />
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
