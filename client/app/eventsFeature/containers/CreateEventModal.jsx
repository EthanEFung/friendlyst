import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';


const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event
  }
}

class CreateEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false}
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
  }

  closeCreateEventModal () {
    this.setState({showModal: false});
  }

  openCreateEventModal () {
    this.setState({showModal: true}, () => console.log(this, 'this is what now has the state'));
  }

  render() {
    let { name, date, location, description } = event;
    return (
    <div>
      <Button className="event-list-button btn btn-default" onClick={this.openCreateEventModal}>
        Create Event
      </Button> 
      <Modal show={this.state.showModal} onHide={this.close}></Modal>
    </div>
    )
  }
}

//connect to store
export default connect(mapStateToProps)(CreateEventModal);