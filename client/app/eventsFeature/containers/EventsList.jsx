import React, { Component } from 'react';
import EventListEntry from '../components/EventListEntry.jsx';
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

  render() {
    return (
      <div>
        {this.props.events.map((event) => <EventListEntry key={event.id} {...event}/>)}
      </div>
    );
  }
}
export default connect(mapStateToProps, { getStoredEvents })(EventsList);