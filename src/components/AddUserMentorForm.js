import React, { Component } from 'react';
import { Form, Select } from 'react-form';

class AddUserMentorForm extends Component {

  validateForm({ mentor }) {
    return {
      mentor: !mentor ? 'Mentor is required' : undefined
    };
  }

  resetForm() {
    this.setValue('mentor', '');
  }

  submitForm({mentor}, state, props, instance) {
    this.props.onSubmitHandler(mentor, this.resetForm.bind(instance));
  }

  render() {
    let mentorsSelectOptions = this.props.availableMentorsList.map(mentor => ({label: mentor.name, value: mentor.id}));

    return (
      <Form onSubmit={(values, state, props, instance) => this.submitForm(values, state, props, instance)} validate={this.validateForm}>
        {({submitForm}) => {
          return (
            <div className='row'>
              <form onSubmit={submitForm}>
                <div className='col s12'><strong>Add a new Mentor:</strong></div>
                <div className='col s9'>
                  <Select field='mentor' options={mentorsSelectOptions} className='browser-default' />
                </div>
                <div className='col s3 valign-wrapper'>
                  <button className='btn waves-effect waves-light valign' type='submit'>Add</button>
                </div>
              </form>
            </div>
          );
        }}
      </Form>
    );
  }
}

export default AddUserMentorForm;