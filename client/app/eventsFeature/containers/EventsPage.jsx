import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Nav.jsx';
import EventList from './EventList.jsx';
import axios from 'axios';

class eventsPage extends Component {

  componentWillMount() {
    axios.get('/api/event/getEvents', {

    })
      .then((events) => {

      })
      .catch(err => {
        console.log('events page could not receive events from the database')
      })
  }

  render() {
    return (
      <div className="events-page-container">
        <div className="navcopy">
          <Nav />
        </div>
        <div className="events-page-info jumbotron">
          <h1 className="display-3">Events</h1>
          <p className="lead">These are the events in your area</p>
          <button className="event-list-button btn btn-default">See events</button>
          <Link to="/create-event-page"><button className="btn btn-default">Create Event</button></Link>
          <hr/>
          <EventList />
        </div>

      </div>
    )
  }
}

export default eventsPage;