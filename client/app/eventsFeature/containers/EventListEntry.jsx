import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ListGroupItem,
  Col,
  Row,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event
  }
}

class EventListEntry extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick() {
    console.log('user wants to delete event from events table')
  }

  render() {
    let { name, date, location, description, formattedDate, id } = this.props;
    return (
      <ListGroupItem key={id}>
        <Row>
        <Col xs={10}>
        { `${name}   ${location}` }
        </Col>
        <Col xs={2}>
          <DropdownButton
            bsStyle="default"
            bsSize="xsmall"
            title="Edit"
          >
          <MenuItem eventKey="1" onClick={this.handleDeleteClick}>Delete</MenuItem>
         
          </DropdownButton>
        </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

export default connect(mapStateToProps)(EventListEntry)