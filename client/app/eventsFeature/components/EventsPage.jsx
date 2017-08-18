import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Nav.jsx';
import EventList from '../containers/EventsList.jsx';
import CreateEventModal from '../components/CreateEventModal.jsx';

class EventsPage extends Component {

  render() {
    return (
      <div className="events-page-container">
        <div className="navcopy">
          <Nav />
        </div>
        <div className="events-page-info">
          <h1 className="display-3">Events</h1>
          <p className="lead">Attend an event near you</p>
          <CreateEventModal />
          <hr/>
          <EventList />
        </div>
      </div>
    )
  }
}

export default EventsPage