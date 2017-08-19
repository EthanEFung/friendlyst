import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedListEntryLikes from './FeedListEntryLikes.jsx';
import FeedListEntryComments from './FeedListEntryComments.jsx';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
	//state.SOMETHING is the reducer
	//so you need another . to access its properties
	return {
		comments: state.commentReducer.comments,
		user: state.userReducer.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		newComment(comment) {
			dispatch({
				type: 'NEW_COMMENT',
				payload: comment
			})
		}
	}
}

class FeedListEntry extends Component {
	constructor(props) {
		super(props);
		this.openPhotoModal = this.openPhotoModal.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
		this.state = {
			comments: [],
			currentComment:[],
			commentText: '',
			name: '',
			imageLink: '',
			showModal: false
		}
		this.handleCommentInput = this.handleCommentInput.bind(this);
		this.submitComment = this.submitComment.bind(this);
		this.timeSince = this.timeSince.bind(this);
	}

	componentDidMount() {
		//get name and image links
		let id = this.props.post.userId;
		axios.get(`api/user/getUserById?id=${id}`)
		.then( (data) => {
			this.setState({name: data.data.nickname});
			this.setState({imageLink: data.data.profilePicture});
		})
		.catch(err => {
			console.log(err, 'could not get data');
		})

		//get comments
		let postId = this.props.post.id;
		axios.get(`api/usercomment/getAllCommentForPost?postId=${postId}`)
		.then( (data) => {
			this.setState({comments: data.data.sort( (a,b) => {
				a = a.updatedAt;
				b = b.updatedAt;
				return a < b ? -1 : a > b ? 1 : 0;
			})});
		})
		.catch(err => {
			console.log(err, 'could not get data');
		})

		this.props.socket.on('new comment', (ID) => {
			if (postId === ID) {
				axios.get(`api/usercomment/getAllCommentForPost?postId=${postId}`)
					.then( (data) => {
						this.setState({comments: data.data.sort( (a,b) => {
							a = a.updatedAt;
							b = b.updatedAt;
							return a < b ? -1 : a > b ? 1 : 0;
						})});
					})
					.catch(err => {
						console.log(err, 'could not get data');
					})
			}
		})
	}

	handleCommentInput(input) {
		let text = input.target.value;
		this.setState({ commentText: text });
	}

	submitComment(e) {
		//console.log('comment button is clicked')
		// this.setState({currentComment: this.state.currentComment.concat([{
		// 	userComment: this.state.commentText,
		// 	postId: this.props.post.id,
		// 	userId: this.props.user.id,
		// 	updatedAt: new Date().toISOString()
		// }])})
		e.preventDefault()

		//should send comment request to server
		let email = this.props.user.email;
		let ID = this.props.post.id;
		let message = (this.state.commentText === '' && focusElement) ? focusElement.val() : this.state.commentText;
		if( message === ''){
			return;
		}
		axios.post('api/usercomment/postComment', {
			email: email,
			postId: ID,
			message: message
		})
		.then(data => {
			//console.log(data);
			this.props.socket.emit('submitted comment', ID)
		})
		.catch(err => {
			console.log('comment did not go through');
		})
		this.setState({
			commentText: ''
		})
	}

	timeSince(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}

	closePhotoModal () {
    this.setState({showModal:false});
  }

  openPhotoModal () {
    this.setState({showModal:true});
  }

	render() {
		return (
			<div className="feed-entry">
				<div>
					<div className="post-info">
						<img src={this.state.imageLink} className="user-img" />
						<Link to={'/' + this.state.name}>
							<div className="post-name">{this.state.name}</div>
						</Link>
						<div className="post-time">{this.timeSince(new Date(this.props.post.createdAt))} ago</div>
						<div className="post-message">{this.props.post.message}</div>
						<img className="post-image" src={this.props.post.image} onClick={this.openPhotoModal}/>
						<Modal show={this.state.showModal} onHide={this.closePhotoModal} className="photo-modal">
        			<Modal.Body closeButton>
          			<img className="enlarged-post-image" src={this.props.post.image}/>
        			</Modal.Body>
						</Modal>
					</div>
				</div>

				<div className="like-section">
					<FeedListEntryLikes post={this.props.post} user={this.props.user}/>
				</div>
				<div className="comment-section">
					<div className="feed-comments-container">
						{this.state.comments.map((comment, key) => (
						<FeedListEntryComments comment={comment} key={key} user={this.props.user} socket={this.props.socket}/>))}   
					</div>  
					{/* <div className="feed-comments-container">
						{this.state.currentComment.map((comment, key) => (
						<FeedListEntryComments comment={comment} key={key} user={this.props.user} socket={this.props.socket}/>))}   
					</div> */}
					<div>
						<form onSubmit={this.submitComment}>
							<input type='text' id="comment-area" placeholder='Make a comment...' value={this.state.commentText} onChange={(input) => this.handleCommentInput(input)} cols="30" rows="4" name="comment"></input>
							{/* <div className="feed-entry-button-container">
								<Button bsStyle="default" onClick={this.submitComment}>Comment</Button>
							</div> */}
						</form>
					</div> 
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedListEntry);