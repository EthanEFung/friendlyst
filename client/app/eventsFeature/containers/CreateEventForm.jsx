import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  ButtonGroup
} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import createNewEvent from "../actions/createNewEvent.js";
import updateEventModal from "../actions/updateEventModal.js";
import updateEntry from "../actions/updateEntry.js";
import updateEvents from "../actions/updateEvents.js";
import axios from "axios";

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events,
    prevEvent: state.updateEventModalReducer.prevEvent,
    isUpdatingEntry: state.updateEntryReducer.isUpdatingEntry
  };
};

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "",
        date: new Date().toISOString(),
        formattedDate: "",
        location: "",
        description: ""
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isUpdatingEntry) {
      this.setState({ event: this.props.prevEvent });
    }
  }

  handleNameChange(e) {
    this.setState({
      event: {
        name: e.target.value,
        date: this.state.event.date,
        formattedDate: this.state.event.formattedDate,
        location: this.state.event.location,
        description: this.state.event.description
      }
    });
  }

  handleDateChange(value, formattedDate) {
    this.setState({
      event: {
        name: this.state.event.name,
        date: value,
        formattedDate: formattedDate,
        location: this.state.event.location,
        description: this.state.event.description
      }
    });
  }

  handleLocationChange(e) {
    this.setState({
      event: {
        name: this.state.event.name,
        date: this.state.event.date,
        formattedDate: this.state.event.formattedDate,
        location: e.target.value,
        description: this.state.event.description
      }
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      event: {
        name: this.state.event.name,
        date: this.state.event.date,
        formattedDate: this.state.event.formattedDate,
        location: this.state.event.location,
        description: e.target.value
      }
    });
  }

  handleEventSubmit() {
    let { name, date, location, description } = this.state.event;
    let { id } = this.props.prevEvent;

    if (this.props.isUpdatingEntry) {
      this.props.updateEntry(false);
      axios
        .get(`/api/event/getEvent`, { params: id })
        .then(event => {
          axios
            .put(`/api/event/updateEvent`, {
              name,
              date,
              location,
              description,
              id
            })
            .then(response => {
              this.props.updateEvents({
                name,
                date,
                location,
                description,
                id
              });
            })
            .catch(err => {
              console.log(
                "error creating updated event after receiving from db",
                err
              );
            });
        })
        .catch(err => {
          console.log("error getting event to update", err);
        });
    } else {
      console.log(
        "the entry is was an update for a new event post",
        this.props.isUpdatingEntry
      );
      axios
        .post(`/api/event/postEvent`, { name, date, location, description })
        .then(event => {
          console.log(`event was posted ${event.data}`);
          this.props.createNewEvent(this.state.event);
        })
        .catch(err => {
          console.log(`error receiving event from the database ${err}`);
        });
    }
  }

  render() {
    let { name, date, location, description } = event;
    return (
      <Form horizontal>
        <FormGroup controlId="eventName">
          <Col componentClass={ControlLabel} xs={3}>
            Event Name:
          </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              value={this.state.event.name}
              placeholder="Enter the event's name"
              onChange={this.handleNameChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="eventDate">
          <Col componentClass={ControlLabel} xs={3}>
            Date:
          </Col>
          <Col xs={9}>
            <DatePicker
              id="datepicker"
              value={this.state.event.date}
              onChange={this.handleDateChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="eventLocation">
          <Col componentClass={ControlLabel} xs={3}>
            Event Location:
          </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              value={this.state.event.location}
              placeholder="Where are you having your event?"
              onChange={this.handleLocationChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="eventDescription">
          <Col componentClass={ControlLabel} xs={3}>
            Event Description:
          </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              componentClass="textarea"
              value={this.state.event.description}
              placeholder="What's your event about?"
              onChange={this.handleDescriptionChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={() => {
              this.handleEventSubmit();
              this.props.handleCloseModal();
            }}
          >
            Save
          </Button>
          {"   "}
          <Button
            onClick={() => {
              this.props.handleCloseModal();
              this.props.updateEntry(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}
export default connect(mapStateToProps, {
  createNewEvent,
  updateEventModal,
  updateEntry,
  updateEvents
})(CreateEventForm);
