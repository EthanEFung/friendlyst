import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Nav.jsx';

const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event
  }
}

class CreateEventPage extends Component {
  render() {
    return (
      <div className="events-page-container">
      <div className="navcopy">
        <Nav />
      </div>
      <div className="events-page-info">
        <h1>Create an event</h1>
        <br/>
      </div>

    </div>
    );
  }
}

//connect to store
export default connect(mapStateToProps)(CreateEventPage);