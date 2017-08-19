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
import Dropzone from 'react-dropzone';
import { Modal } from 'react-bootstrap';

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
			postURL: '',
			imageURL: '',
			postButtonStatus: false,
			previewThumbnail: false,
			showGameModal: false
		}
		this.closeGameModal = this.closeGameModal.bind(this)
		this.openGameModal = this.openGameModal.bind(this)
		this.setText = this.setText.bind(this)
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
		var appComponent = this
		if(annyang){
			window.onload = function(){
				var commands = {
					'type *text': appComponent.setText,
					'hello': function(){console.log('hello')}
				};
				annyang.debug();
				annyang.addCommands(commands);
				// annyang.addCallback('errorNetwork', ()=>{
				// 	console.log('error')
				// })
				annyang.addCallback('result', (phrases)=>{
					console.log('i think you said: ', phrases[0]);
					console.log('but u also mighta said: ', phrases);
				})
				annyang.start();
			}
		}

		$('textarea').focus(function(){
			focusElement = $(this);
			console.log(focusElement);
		});
		$('#post-area').focus();

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
	setText(text){
		console.log('setting text ::: ', text)
		focusElement.val(text);
		// focusElement.trigger($.Event('keydown', {keycode: 32}));
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

	submitPost() {
		console.log('now im in this.submitPost')

		axios.post('api/post/postPost', {
			email: this.props.user.email,
			message: $('#post-area').val(),
			image: this.state.imageURL
		})
			.then(({ data }) => {
				//console.log(`this.submitPost data is ${JSON.stringify(data)}`)
				//this.props.newPost(data);
				this.props.socket.emit('new post', data)
			})
			.catch(err => {
				console.log(err);
			})
		document.getElementById('post-area').value='';
		this.setState({
			previewThumbnail: ''
		})
	}

	addPostImage(files) {
		this.setState({
			postButtonStatus: true
		}, () => {
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

					this.setState({
						imageURL: imageURL,
						postButtonStatus: false,
						previewThumbnail: true
					})
				})
			})
		})
	}

	openGameModal() {
		console.log('CLICKED OPEN GAME MODAL FUNCTION')
    this.setState({
      showGameModal: true
		})
  }

  closeGameModal() {
    this.setState({
      showGameModal: false
    })
  }

	render() {
		//console.log('THIS IS THE PROPS.FRIENDS ::::: ', this.props.friends)

		return (
			<div>
				<Nav nickname={this.props.user.nickname} picture={this.props.user.profilePicture} handleGameModalOpen={this.openGameModal} />
				<div className="home-page-container">
					<div className="post-section">
						<div className="flexbox2">
							<div className="flexbox-container">
								<Dropzone
									onDrop={this.addPostImage}
									multiple
									accept="image/*"
									className="post-dropzone"
									disableClick={true}
								>
								<textarea id="post-area" placeholder="What's on your mind?"></textarea>
								<img src={this.props.user.profilePicture} id='statusPicture' />
								</Dropzone>
							</div>
						</div>
						<div className="flexbox">
							<div className="post-features">
								<span className="input-button-container post-submit-button"><Button bsStyle="success" disabled={this.state.postButtonStatus} onClick={this.submitPost.bind(this)}>Post</Button></span>
								<span className="input-button-container post-image-upload-button">
									<Button bsStyle="success">
										<div className="limit-dropzone">
											<Dropzone
												preventDropOnDocument={false}
												onDrop={this.addPostImage}
												multiple={false}
												className="post-image-button-dropzone"
											>
											Attach Image
											</Dropzone>
										</div>
									</Button>
								</span>
								{this.state.previewThumbnail ? <span className="post-preview-thumbnail-section"><img className="post-preview-thumbnail" src={this.state.imageURL}/></span>: <span></span>}
							</div>
						</div>
					</div>
					<FeedList posts={this.props.posts} user={this.props.user} socket={this.props.socket} />
				</div>
				<Modal dialogClassName="custom-modal" show={this.state.showGameModal} onHide={this.closeGameModal}>
						<Modal.Body>
							<iframe width='1260' height='700' frameBorder='0' src='http://boomboomcats.herokuapp.com'></iframe>
						</Modal.Body>
					</Modal>
				<FriendList friends={this.props.friends} appendChatRoom={this.props.appendChatRoom} user={this.props.socket} />
				<ChatRoomList nickname={this.props.user.nickname} chatRooms={this.props.chatRooms} closeRoom={this.props.closeRoom} userId={this.props.user.id} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)