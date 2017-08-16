import React, { Component } from 'react'
import Nav from './Nav.jsx'
import { connect } from 'react-redux';
import FeedListEntry from './FeedListEntry.jsx';

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

class FriendProfile extends Component {

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
      </div>
    )
  }
}

export default connect(mapStateToProps)(FriendProfile);