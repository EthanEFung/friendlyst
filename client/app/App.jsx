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
import Dropzone from 'react-dropzone'

const auth = new Auth();

const mapStateToProps = (state) => {
	return {
		posts: state.postsReducer.posts,
		friends: state.friendsReducer.friends,
		chatRooms: state.chatRoomReducer.chatRooms,
		user: state.userReducer.user,
		friend: state.friendReducer.friend,
		socket: state.socketReducer.socket,
		// events: state.eventsReducer.events
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
		// initEvent(event) {
		// 	dispatch({
		// 		type: 'INIT_EVENT',
		// 		payload: event
		// 	})
		// }
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.addPostImage = this.addPostImage.bind(this)
		this.state = {
			friendLyst: [],
			socket: {},
			postURL: ''
		}
	}

	componentWillMount() {
		if (!auth.isAuthenticated()) {
			auth.handleAuthentication(this.props.newUser, this.manageChat.bind(this));
		} else {
			auth.setUserWhenAuthenticated(this.props.newUser, this.manageChat.bind(this));
		}
		

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

	componentDidMount() {
		this.socket = io('/')
		//console.log('THIS IS THE SOCKET PROP ::: ', this.props.socket)
		this.socket.on('update posts', (message) => {
			let email = this.props.user.email;
			axios.get(`api/post/getAllUserPost?email=${email}`)
				.then(({ data }) => {
					data.forEach(post => this.props.newPost(post))
					axios.get(`api/post/getAllFriendPost/?email=${email}`)
						.then(({ data }) => {
							data.forEach(post => this.props.newPost(post))
							this.props.posts.sort((a, b) => b.id - a.id);
						})
						.catch(err => {
							console.log(`Error getting friend posts! ${err}`);
						})
				})
				.catch(err => {
					console.log(`Error getting user posts! ${err}`);
			})
		})
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

					this.socket.nickname = nickname

					this.socket.emit('new user', nickname)

					this.socket.on('user created', usernames => {
						let friendsNicknames = this.state.friendLyst.map(friend => friend.nickname)
						friendsNicknames.push(nickname) //pushing the user himself to the array

						usernames = usernames.filter(username => friendsNicknames.indexOf(username) !== -1)

						// console.log('friends', friendsNicknames)
						// console.log('usernames', usernames)
						
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

	submitPost(imageURL) {
		console.log('now im in this.submitPost')

		axios.post('api/post/postPost', {
			email: this.props.user.email,
			message: $('#post-area').val(),
			image: imageURL || null
		}).then(({ data }) => {
			console.log(`this.submitPost data is ${JSON.stringify(data)}`)
			this.props.newPost(data);
		}).catch(err => {
			console.log(err);
		})
			.then(({ data }) => {
				//this.props.newPost(data);
				this.props.socket.emit('new post', data)
			})
			.catch(err => {
				console.log(err);
			})
		document.getElementById('post-area').value='';
	}

	addPostImage(files) {
		console.log(`Dropzone activated`)
		const uploaders = files.map( (file) => {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('tags', `dyrwrlv2h, medium, gist`)
			formData.append('upload_preset', 'twliuw5d')
			formData.append('api_key', '377437738276986')
			formData.append('timestamp', (Date.now() / 1000) | 0)

			return axios.post('https://api.cloudinary.com/v1_1/dyrwrlv2h/image/upload', formData, {
				headers: { "X-Requested-With": "XMLHttpRequest" }
			}).then( (response) => {
				const data = response.data
        const imageURL = data.secure_url
        console.log(`this is the fileURL ${imageURL}`)
        console.log(`this is the data ${JSON.stringify(data)}`)
        console.log(`this is this.props.user ${JSON.stringify(this.props.user)}`)
        this.submitPost(imageURL)
      })
		})
	}

	render() {
		//console.log('THIS IS THE PROPS.FRIENDS ::::: ', this.props.friends)

		return (
			<div>
				<Nav nickname={this.props.user.nickname} picture={this.props.user.profilePicture} />
				<div className="home-page-container">
					<img src={this.props.user.profilePicture} id='statusPicture' />
					<Dropzone
						onDrop={this.addPostImage}
						multiple
						accept="image/*"
						className="postImage"
						disableClick="true"
					>
						<textarea id="post-area" placeholder="What's on your mind?"></textarea>
					</Dropzone>
					<div className="input-button-container"><Button bsStyle="success" onClick={this.addPostImage.bind(this)}>Attach Image</Button></div>
					<div className="input-button-container"><Button bsStyle="success" onClick={this.submitPost.bind(this)}>Post</Button></div>
					<FeedList posts={this.props.posts} user={this.props.user} socket={this.props.socket} />
				</div>
				<FriendList friends={this.props.friends} appendChatRoom={this.props.appendChatRoom} user={this.props.socket} />
				<ChatRoomList nickname={this.props.user.nickname} chatRooms={this.props.chatRooms} closeRoom={this.props.closeRoom} userId={this.props.user.id} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)