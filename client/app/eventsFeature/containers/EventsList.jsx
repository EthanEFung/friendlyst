import React, { Component } from 'react';
import EventListEntry from '../containers/EventListEntry.jsx';
import { 
  Col,
  ListGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import getStoredEvents from '../actions/getStoredEvents';
import axios from 'axios';

const mapStateToProps = (state) => {
	return {
		events: state.eventsReducer.events
	}
}

class EventsList extends Component {

  componentDidMount() {
    axios.get('/api/event/getEvents')
      .then(events => {
        this.props.getStoredEvents(events.data)
      })
      .catch(err => {
        console.log('events page could not receive events from the database', err)
      })
  }

  // componentWillReceiveProps() {
  //   axios.get('/api/event/getEvents')
  //   .then(events => {
  //     this.props.getStoredEvents(events.data)
  //   })
  //   .catch(err => {
  //     console.log('events page could not receive events from the database', err)
  //   })
  // }

  render() {
    return (
      <div>
        <Col xs={1}/>

        <Col xs={10}>
          <ListGroup className="event-list">
            {this.props.events.map((event) => <EventListEntry key={event.id} {...event}/>)}
          </ListGroup>
        </Col>
        
        <Col xs={1}/>
      </div>
    );
  }
}
export default connect(mapStateToProps, { getStoredEvents })(EventsList);