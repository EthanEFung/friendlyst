import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock, 

} from 'react-bootstrap';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }

    this.getValidationState = this.getValidationState.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  getValidationState() {
    length = this.state.value.length;
    if (length > 10) {
      return 'success';
    } else if (length > 5){
      return 'warning';
    } else {
      return 'error';
    }
  }

  handleValueChange(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    console.log(this, 'this is the form')
    return (
      <Form horizontal>
        <FormGroup
          controlId="eventName"
          validationState={this.getValidationState()}
        >
          <Col componentClass={ControlLabel} sm={3}>Event Name</Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter the event's name"
              onChange={this.handleValueChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length</HelpBlock>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default CreateEventForm;