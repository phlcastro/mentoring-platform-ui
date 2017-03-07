import React, { Component } from 'react';
import { Form, Textarea } from 'react-form';

class NewAnswerForm extends Component {

  validateForm({ answer }) {
    return {
      answer: !answer ? 'Answer is required' : undefined
    };
  }

  resetForm() {
    this.setValue('answer', '');
  }

  submitForm(values, state, props, instance) {
    this.props.onSubmitHandler(values, this.resetForm.bind(instance));
  }

  render() {
    return (
      <Form onSubmit={(values, state, props, instance) => this.submitForm(values, state, props, instance)} validate={this.validateForm}>
        {({submitForm}) => {
          return (
            <div className='card-panel grey lighten-5'>
              <h5 className='center-align'>Submit a new answer:</h5>
              <form onSubmit={submitForm}>
                <div className='input-field col s12'>
                  <Textarea field='answer' placeholder='Type here your answer' className='materialize-textarea' />
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

export default NewAnswerForm;
