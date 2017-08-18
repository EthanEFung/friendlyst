import React, { Component } from 'react';
import { 
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';


class EventListEntry extends Component {
  render() {
    console.log(this.props)
    let { name, date, location, description, formattedDate } = this.props;
    return (
      <div className="card ">
        { `${name} ${formattedDate} ${location}` }
      </div>
    );
  }
}

export default EventListEntry;