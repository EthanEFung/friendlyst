import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Modal, 
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock, 
} from 'react-bootstrap';


const mapStateToProps = (state) => {
  return {
    event: state.eventsReducer.event
  }
}

class CreateEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      value: '',
    }
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  getValidationState() {
    length = this.state.value.length;
    if (length > 10) {
      return 'success';
    } else if (length > 5){
      return 'warning';
    } else {
      return 'error';
    }
  }

  handleValueChange(e) {
    this.setState({ value: e.target.value })
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
      <Modal show={this.state.showModal} onHide={this.closeCreateEventModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Example with Validation</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleValueChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeCreateEventModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

//connect to store
export default connect(mapStateToProps)(CreateEventModal);