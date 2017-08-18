import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ListGroupItem,
  Col,
  Row,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import axios from 'axios'

const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event
  }
}

class EventListEntry extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
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

export default connect(mapStateToProps)(EventListEntry)