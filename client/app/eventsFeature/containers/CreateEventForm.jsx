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
import DatePicker from 'react-bootstrap-date-picker'
import createNewEvent from '../actions/createNewEvent.js'

const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event
  }
}

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    let date = new Date().toISOString();
    this.state = {
      event: {
        name: '',
        date: date,
        formattedDate: '',
        location: '',
        description: '',
      }
    }

    this.getValidationState = this.getValidationState.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getValidationState() {
    length = this.state.event.name.length;
    if (length > 10) {
      return 'success';
    } else if (length > 5){
      return 'warning';
    } else {
      return 'error';
    }
  }
  handleNameChange(e) {
    this.setState({ 
      event: { 
        name: e.target.value, 
        date: this.state.event.date, 
        formattedDate: this.state.event.formattedDate, 
        location: this.state.event.location, 
        description:this.state.event.description
       }
    })
  }
  handleDateChange(value, formattedDate) {
    this.setState({ 
      event: {
        name: this.state.event.name, 
        date: value,
        formattedDate: formattedDate,
        location: this.state.event.location,
        description: this.state.event.description,
      }
    })
  }

  componentDidUpdate() {
    let hiddenInputElement = document.getElementById("datepicker");
    console.log(hiddenInputElement.value, 'this is the ISO string date')
    console.log(hiddenInputElement.getAttribute('data-formattedvalue'))
  }

  render() {
    let { name, date, location, description } = event;
    console.log(this.state, 'this is the state of the form')
    return (
      <Form horizontal>
        <FormGroup
          controlId="eventName"
          validationState={this.getValidationState()}
        >
          <Col componentClass={ControlLabel} xs={3}>Event Name: </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              value={this.state.event.name}
              placeholder="Enter the event's name"
              onChange={this.handleNameChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length</HelpBlock>
          </Col>
        </FormGroup>


        <FormGroup controlId="eventDate">
          <Col componentClass={ControlLabel} xs={3}>Date: </Col>
          <Col xs={9}>
            <DatePicker 
              id="datepicker" 
              value={this.state.event.date}
              onChange={this.handleDateChange}
            />  
            <HelpBlock>Validation is based on string length</HelpBlock>
          </Col>
        </FormGroup>


      </Form>
    );
  }
}
export default connect(mapStateToProps, { createNewEvent })(CreateEventForm);