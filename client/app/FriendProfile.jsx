import React, { Component } from 'react'
import Nav from './Nav.jsx'
import { connect } from 'react-redux';
import FeedListEntry from './FeedListEntry.jsx';
import ChatRoomList from './ChatRoomList.jsx'
import FriendList from './FriendList.jsx'

const mapStateToProps = (state) => {
  return {
    friendinfo: state.friendinfoReducer.friendinfo,
		posts: state.postsReducer.posts,
		friends: state.friendsReducer.friends,
		chatRooms: state.chatRoomReducer.chatRooms,
		user: state.userReducer.user,
		friend: state.friendReducer.friend
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		newPost(post) {
			dispatch({
				type: 'NEW_POST',
				payload: post
			})
		},
		appendChatRoom(room) {
			dispatch({
				type: 'ADD_ROOM',
				payload: room
			})
		},
		newFriend(friend) {
			dispatch({
				type: 'ADD_FRIEND',
				payload: friend
			})
		},
		friendOffline(friendList) {
			dispatch({
				type: 'FRIEND_OFFLINE',
				payload: friendList
			})
		},
		closeRoom(room) {
			dispatch({
				type: 'CLOSE_ROOM',
				payload: room
			})
		},
		newUser(userInfo) {
			dispatch({
				type: 'NEW_USER',
				payload: userInfo
			})
		},
		setSocket(socket) {
			dispatch({
				type: 'NEW_SOCKET',
				payload: socket
			})
		}
	}
}

class FriendProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
			friendLyst: [],
			socket: {}
		}
  }

  render() {
    {console.log(this.props.posts)}
    return (
      <div className="profile-container">
        <div className="navcopy">
          <Nav />
        </div>
        <br/>
        <div className="friend-profile-info-container">
          <div>
            <img src={this.props.friendinfo.profilePicture} />
          </div>
          <div>
            Username: {this.props.friendinfo.nickname}
          </div>
          <div>
            Email: {this.props.friendinfo.email}
          </div>
        </div>
        <div>
          {
            this.props.posts
              .filter(post => this.props.friendinfo.id === post.userId)
              .map(post => {
                return <FeedListEntry key={post.id} post={post} user={this.props.user}/>
              })
          }
        </div>
        <FriendList friends={this.props.friends} appendChatRoom={this.props.appendChatRoom} user={this.props.socket} />
        <ChatRoomList nickname={this.props.user.nickname} chatRooms={this.props.chatRooms} closeRoom={this.props.closeRoom} userId={this.props.user.id} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(FriendProfile);