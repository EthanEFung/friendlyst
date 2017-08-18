import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../Auth/Auth';
import { connect } from 'react-redux';

const auth = new Auth();

const mapStateToProps = (state) => {
	//state.SOMETHING is the reducer
	//so you need another . to access its properties
	return {
		posts: state.postsReducer.posts,
		chatRooms: state.chatRoomReducer.chatRooms,
		user: state.userReducer.user,
    friend: state.friendReducer.friend
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		newFriend(friend) {
			dispatch({
				type: 'NEW_FRIEND',
				payload: friend
			})
    }
	}
}

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.props.newFriend(event.target.value);
    //console.log(this.props.friend)
  }

  render() {
    return (
    <div id="nav-bar">
      <Link to="/home" className="nav-bar-image"><img className="resize2" src="friendlystlogo.jpg" /></Link>
      <button className="buttons" onClick={() => auth.logout()}>Logout</button>
      <button className='buttons'><a href='http://boomboomcats.herokuapp.com'>BoomBoom Cats</a></button>
      <Link to="/events-page"><button className="buttons">Events</button></Link>
      <Link to="/profile">
        <button className="buttons">{this.props.nickname}</button>
        <img src={this.props.picture} className='buttons' id='navProfilePicture' />
      </Link>
      
      <form style={{position:'relative', marginTop:'10px', marginLeft:'10px'}}>
        <input type="text" onChange={this.handleChange.bind(this)} style={{width:"200px"}}/>
        <Link to={"/" + this.props.friend}><input className="nav-bar-magnifier"type="image" src="https://cdn0.iconfinder.com/data/icons/basic-lines/39/search-512.png" style={{height:'18px',width:'18px',position:'absolute', top:'3px'}} /></Link>
      </form>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)