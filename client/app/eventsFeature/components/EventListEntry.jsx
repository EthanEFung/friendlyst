import React, { Component } from 'react';

class EventListEntry extends Component {
  render() {
    let { name, date, location, description } = this.props;
    return (
      <div className="card ">
        { name + date + location }
      </div>
    );
  }
}

export default EventListEntry;