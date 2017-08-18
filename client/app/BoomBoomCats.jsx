import React from 'react'
import { Modal } from 'react-bootstrap';

export default class BoomBoomCats extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal = false
    }
    this.openGameModal = this.openGameModal.bind(this)
  }

  openGameModal() {
    this.setState({
      showModal = true
    })
  }

  closeGameModal() {
    this.setState({
      showModal = false
    })
  }

  render() {
    return (

      <div>
        <Modal show={this.state.showModal}  />
      </div>

    )
  }
}