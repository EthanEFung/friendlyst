import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import axios from 'axios';
import Nav from './Nav.jsx';
import FeedList from './FeedList.jsx';
import Auth from '../Auth/Auth';
import FriendList from './FriendList.jsx';
import FriendProfileRoute from './FriendProfileRoute.jsx';
import ChatRoomList from './ChatRoomList.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const auth = new Auth();

const mapStateToProps = (state) => {
	return {
		posts: state.postsReducer.posts,
		friends: state.friendsReducer.friends,
		chatRooms: state.chatRoomReducer.chatRooms,
		user: state.userReducer.user,
		friend: state.friendReducer.friend,
		socket: state.socketReducer.socket,
		events: state.eventsReducer.event
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
		},
		createEvent(event) {
			dispatch({
				type: 'CREATE_EVENT',
				payload: event
			})
		}
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			friendLyst: [],
			socket: {}
		}
	}

	componentWillMount() {
		auth.handleAuthentication(this.props.newUser, this.manageChat.bind(this));

		setTimeout(() => {
			if (!this.props.posts.length) {
				let email = this.props.user.email;
				axios.get(`api/post/getAllUserPost?email=${email}`)
					.then(({ data }) => {
						data.forEach(post => this.props.newPost(post))
						axios.get(`api/post/getAllFriendPost/?email=${email}`)
							.then(({ data }) => {
								data.forEach(post => this.props.newPost(post))
							})
							.catch(err => {
								console.log(`Error getting friend posts! ${err}`);
							})
					})
					.catch(err => {
						console.log(`Error getting user posts! ${err}`);
				})
			}
		}, 1500)

		this.props.posts.sort((a, b) => b.id - a.id);

	}

	manageChat(nickname) {
	
		axios.get('/api/user/getUserFriend', {
			params: {
				nickname: this.props.user.nickname
			}
		})
		.then(({ data }) => {
			axios.get('/api/friend/getAllFriend', {
				params: {
					userId: data.id
				}
			})
			.then(({ data }) => {
				data = data.map(friendShip => friendShip.buddyId)
				axios.get('/api/user/getUsersById', {
					params:{
						ids: data
					}
				}).then(({ data }) => {
					this.setState({
						friendLyst: data
					})
					this.socket = io('/');

					this.socket.nickname = nickname

					this.socket.emit('new user', nickname)

					this.socket.on('user created', usernames => {
						let friendsNicknames = this.state.friendLyst.map(friend => friend.nickname)
						friendsNicknames.push(nickname) //pushing the user himself to the array

						usernames = usernames.filter(username => friendsNicknames.indexOf(username) !== -1)

						console.log('friends', friendsNicknames)
						console.log('usernames', usernames)
						
						this.props.newFriend(usernames)
					})
					//taking user off from current list
					this.socket.on('user disconnected', usernames => {
						this.props.friendOffline(usernames)
					})

					this.props.setSocket(this.socket)
				})
			})
		})		
	}

	submitPost() {
		axios.post('api/post/postPost', {
			email: this.props.user.email,
			message: $('#post-area').val()
		})
			.then(({ data }) => {
				this.props.newPost(data);
			})
			.catch(err => {
				console.log(err);
			})
		document.getElementById('post-area').value='';
	}

	render() {

		return (
			<div>
				<Nav />
				<div className="home-page-container">
					<textarea id="post-area" placeholder="What's on your mind?"></textarea>					
					<div className="input-button-container"><Button bsStyle="success" onClick={this.submitPost.bind(this)}>Post</Button></div>
					<FeedList posts={this.props.posts} user={this.props.user} />
				</div>
				<FriendList friends={this.props.friends} appendChatRoom={this.props.appendChatRoom} user={this.props.socket} />
				<ChatRoomList nickname={this.props.user.nickname} chatRooms={this.props.chatRooms} closeRoom={this.props.closeRoom} userId={this.props.user.id} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)