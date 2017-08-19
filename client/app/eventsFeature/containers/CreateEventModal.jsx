import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Modal, 
  Button,
} from 'react-bootstrap';
import CreateEventForm from '../containers/CreateEventForm.jsx';
import closeModal from '../actions/closeModal.js';
import openModal from '../actions/openModal.js';

const mapStateToProps = (state) => {
	return {
    showModal: state.createEventModalReducer.showModal
	}
}

class CreateEventModal extends Component {
  constructor(props) {
    super(props);
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
  }

  closeCreateEventModal() {
    this.props.closeModal(false);
  }

  openCreateEventModal() {
    this.props.openModal(true);
  }

  render() {
    return (
    <div>
      <Button className="event-list-button btn btn-default" onClick={this.openCreateEventModal}>
        Create Event
      </Button> 
      <Modal show={this.props.showModal} onHide={this.closeCreateEventModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEventForm handleCloseModal={this.closeCreateEventModal}/>
        </Modal.Body>
      </Modal>
    </div>
    )
  }
}
// Cancel and Save Buttons are found in the CreateEventForm Modal

export default connect(mapStateToProps, { closeModal, openModal })(CreateEventModal)