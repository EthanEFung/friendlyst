import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../../Nav.jsx';
import EventList from '../containers/EventsList.jsx';

const mapStateToProps = (state) => {
	return {
		events: state.eventsReducer.events
	}
}

class EventsPage extends Component {
  render() {
    return (
      <div className="events-page-container">
        <div className="navcopy">
          <Nav />
        </div>
        <div className="events-page-info">
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

export default connect(mapStateToProps, {  })(EventsPage)