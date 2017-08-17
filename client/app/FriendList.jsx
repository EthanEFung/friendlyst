import React, { Component } from 'react'
import FriendListEntry from './FriendListEntry.jsx'
import { connect } from 'react-redux'
import $ from 'jquery'

class FriendList extends Component {
  componentDidMount() {
  }

  minimize() {
    $('.friend-list-container').hide()
    $(".friend-list-container-minimize").show()
  }

  maximize() {
    $('.friend-list-container').show()
    $(".friend-list-container-minimize").hide()
  }

  render() {

    return (
      <div>
        <div className="friend-list-container">
          <p onClick={this.minimize}>Friends Online</p>
          <div className="friend-list">
            {
              this.props.friends.map((friend) => {
                return <FriendListEntry friend={friend} appendChatRoom={this.props.appendChatRoom} user={this.props.user} />
              })
            }
          </div>
        </div>

        <div className="friend-list-container-minimize" style={{ display: 'none' }} onClick={this.maximize}>
          <p onClick={this.maximize}>Chat ({this.props.friends.length})</p>
        </div>
      </div>
    )
  }
}

export default FriendList
