import React, { Component } from 'react';
import Nav from '../../Nav.jsx';

class createEventPage extends Component {
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
export default createEventPage;