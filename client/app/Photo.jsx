import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

export default class Photo extends Component {
  constructor(props) {
    super(props)
    this.openPhotoModal = this.openPhotoModal.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
    this.state = {
      showModal: false
    }
  }

	closePhotoModal() {
    this.setState({showModal:false});
  }

  openPhotoModal() {
    this.setState({showModal:true});
  }

  render() {
    return (
      <span>
        <img src={this.props.image.secure_url} className="photo-album-photo photo-center" onClick={this.openPhotoModal}/>
          <Modal show={this.state.showModal} onHide={this.closePhotoModal} className="photo-modal">
          <Modal.Body>
            <img className="enlarged-post-image" src={this.props.image.secure_url}/>
          </Modal.Body>
          </Modal>
      </span>
    )
  }
}