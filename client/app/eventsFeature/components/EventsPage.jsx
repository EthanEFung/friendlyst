import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Nav.jsx';
import EventList from './EventList.jsx';

class eventsPage extends Component {

  render() {
    return (
      <div className="events-page-container">
        <div className="navcopy">
          <Nav />
        </div>
        <div className="events-page-info">
          <h1>Events</h1>
          <br/>
          <Link to="/create-event-page"><button className="create-event-button">Create Event</button></Link>
        </div>
        <EventList />

      </div>
    )
  }
}

export default eventsPage;