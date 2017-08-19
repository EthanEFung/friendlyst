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
import updateEventModal from '../actions/updateEventModal.js'
import axios from 'axios'

const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event,
    showModal: state.createEventModalReducer.showModal
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
        console.log('deleted event from the database', event);
      })
      .catch(err => {
        console.log('error, no response from the server deleteing event', err)
      })
  }

  handleUpdateClick() {
    console.log('user wants to update event from events table')
    
    this.props.openModal(true);
    console.log(`this is the state event`, this.state);
    this.props.updateEventModal(this.state);

    // axios.put('/api/event/updateEvent', {this.state.event})
  }

  render() {
    let { name, date, location, description, formattedDate, id } = this.props;
    return (
      <ListGroupItem >
        <Row>
        <Col xs={10}>
        { `${name}   ${location}` }
        </Col>
        <Col xs={2}>
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

export default connect(mapStateToProps, { closeModal, openModal, updateEventModal })(EventListEntry)