import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ListGroupItem,
  Col,
  Row,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import closeModal from '../actions/closeModal.js';
import openModal  from '../actions/openModal.js';
import updateEventModal from '../actions/updateEventModal.js';
import updateEntry from '../actions/updateEntry.js';
import deleteEvent from '../actions/deleteEvent.js';
import axios from 'axios'

const mapStateToProps = (state) => {
  return {
    events: state.eventsReducer.events,
    event: state.eventsReducer.event,
    showModal: state.createEventModalReducer.showModal,
    isUpdatingEntry: state.updateEntryReducer.isUpdatingEntry
  }
}

class EventListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      date: '',
      location: '', 
      description: '',
      id: '',
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.name, 
      date: this.props.date,
      location: this.props.location,
      description: this.props.description,
      id: this.props.id
    })
  }

  handleDeleteClick() {
    console.log('user wants to delete event from events table')
    
    let { name, date, location, description, id } = this.props
    console.log('these are the props of the eventlistEntry user wants to delete', {name, date, location, description, id})
    axios.delete('/api/event/deleteEvent', {data: { name, date, location, description, id } })
      .then(event => {
        this.props.deleteEvent({name, date, location, description, id})
      })
      .catch(err => {
        console.log('error, no response from the server deleteing event', err)
      })
  }

  handleUpdateClick() {
    console.log('user wants to update event from events table')
    this.props.updateEntry(true);
    this.props.openModal(true);
    this.props.updateEventModal(this.state);
  }

  render() {
    let { name, date, location, description, formattedDate, id } = this.props;
    const eventDate = new Date(date);
    const year = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOV', 'DEC'];
    const month = year[eventDate.getMonth()];
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const day = week[eventDate.getDay()];
    return (
      <ListGroupItem >
        <Row>
          <Col xs={2} >
            <Row className="event-entry-date">
              <p><b>{month}{eventDate.getDate()}</b></p>
              <h4>{day}</h4>
            </Row>
          </Col>

          <Col xs={8} >
            <Row className="event-entry-info">
              <h3>{name}</h3>
              <p><b>loc:</b> {location}</p>
              <p><b>desc:</b> {description}</p>
            </Row>
          </Col>
          

          <Col xs={2} >
            <DropdownButton
              bsStyle="default"
              bsSize="xsmall"
              title="Edit "
              id={id}
            >
            <MenuItem eventKey="1" onClick={this.handleDeleteClick} id={id}>Delete</MenuItem>
            <MenuItem eventKey="2" onClick={this.handleUpdateClick} id={id}>Update</MenuItem>
            </DropdownButton>
          </Col>

        </Row>
      </ListGroupItem>
    );
  }
}

export default connect(mapStateToProps, { closeModal, openModal, updateEventModal, updateEntry, deleteEvent })(EventListEntry)