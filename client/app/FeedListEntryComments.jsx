import React, { Component } from 'react';
import FeedListEntryLikes from './FeedListEntryLikes.jsx';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class FeedListEntryComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageLink: '',
			subcomments: [],
			subcommentText: '',
			showSubComments: false
		}
		this.toggleShowSubComment = this.toggleShowSubComment.bind(this);
		this.handleSubCommentInput = this.handleSubCommentInput.bind(this);
		this.submitSubComment = this.submitSubComment.bind(this);
		this.timeSince = this.timeSince.bind(this);
	}
	toggleShowSubComment(){
		this.setState({
			showSubComments: !this.state.showSubComments
		})
	}
	componentDidMount() {
		//get name and image links
		let id = this.props.comment.userId;
		axios.get(`api/user/getUserById?id=${id}`)
		.then( (data) => {
			this.setState({name: data.data.nickname});
			this.setState({imageLink: data.data.profilePicture});
		})
		.catch(err => {
			console.log(err, 'could not get data');
		})
		let commentId = this.props.comment.id;
		axios.get(`api/usercomment/getAllSubComments?parentId=${commentId}`)
		.then( (data) => {
			this.setState({subcomments: data.data.sort( (a,b) => {
				a = a.updatedAt;
				b = b.updatedAt;
				return a < b ? -1 : a > b ? 1 : 0;
			})});
		})
		.catch(err => {
			console.log(err, 'could not get data');
		})
	}
	submitSubComment() {
		console.log('comment button is clicked')
		this.setState({subcomments: this.state.subcomments.concat([{
			userComment: this.state.subcommentText,
			parentId: this.props.comment.id,
			userId: this.props.user.id,
			updatedAt: new Date().toISOString()
		}])})

		//should send comment request to server
		let email = this.props.user.email;
		let ID = this.props.comment.id;
		console.log(email, ID, this.state.commentText)
		axios.post('api/usercomment/postComment', {
			email: email,
			parentId: ID,
			message: this.state.subcommentText
		})
		.then(data => {
			console.log(data);
		})
		.catch(err => {
			console.log('comment did not go through');
		})
		this.setState({
			subcommentText: ''
		})
		//document.getElementById('comment-area').val('');
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
	handleSubCommentInput(input) {
		let text = input.target.value;
		this.setState({ subcommentText: text });
	}
	render() {
		console.log(this.state.subcomments)
		return (

				<div className="comment-container">
					<hr className="hr-style" />
					<div className="post-info">
						<img src={this.state.imageLink} className="user-img" />
						<div className="post-name">{this.state.name}</div>
						<div className="post-time">{this.timeSince(new Date(this.props.comment.updatedAt))} ago</div>
					</div>
					<div className="comment-time">
						<div className="comment">{this.props.comment.userComment}</div>
					</div>
					<div>
						{this.state.showSubComments ?
							this.state.subcomments.length === 0 ?
							<div>
								<div className="subcomment-view" onClick={this.toggleShowSubComment}>
									Hide Comments
								</div>
								<div  className="card" style={{border: "1px solid #839496", padding: "10px"}}>
									<form>
									<textarea ref="comment" className="comment-area" onChange={(input) => this.handleSubCommentInput(input)} cols="30" rows="4" name="comment"></textarea>
									<div className="feed-entry-button-container">
										<Button bsStyle="default" onClick={this.submitSubComment}>Comment</Button>
									</div>
									</form>
								</div>
							</div>
							:
							<div>
								<div className="subcomment-view" onClick={this.toggleShowSubComment}>
									Hide Comments
								</div>
								<div  className="card" style={{border: "1px solid #839496", padding: "10px"}}>
									<div>
										{this.state.subcomments.map((subcomment, key) => {
											console.log(subcomment)
											return <FeedListEntryComments comment={subcomment} key={key} user={this.props.user}/>
										})}
									</div>
									<div>
										<form>
										<textarea id="comment-area" value={this.state.subcommentText} onChange={(input) => this.handleSubCommentInput(input)} cols="30" rows="4" name="comment"></textarea>
										<div className="feed-entry-button-container">
											<Button bsStyle="default" onClick={this.submitSubComment}>Comment</Button>
										</div>
										</form>
									</div>
								</div>
							</div>
						:
							this.state.subcomments.length === 0 ?
							<div className="subcomment-view" onClick={this.toggleShowSubComment}>
								Show Subcomments
							</div>
							:
							<div className="subcomment-view" onClick={this.toggleShowSubComment}>
								Show Subcomments({this.state.subcomments.length})
							</div>
						}
					</div>
				</div>
		)
	}
}

export default FeedListEntryComments;