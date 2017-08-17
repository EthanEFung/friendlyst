import React, { Component } from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'

class FriendListEntry extends Component {
  //each entry should store username so that when clicked, it can grab info from db and open socket

  openChatRoom() {
    //calling appendChatRoom in the App component
    let room = {
      user: this.props.user,
      friend: this.props.friend,
    }
    //console.log('this is room',room)
    this.props.appendChatRoom(room)
  }

  render() {
    return (
      <div className="friend-container" onClick={this.openChatRoom.bind(this)}>
        {this.props.friend}
      </div>
    )
  }
}

export default FriendListEntry