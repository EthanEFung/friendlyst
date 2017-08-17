import React from 'react';
import axios from 'axios';

class FeedListEntryLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      userLike: '',
      userLikes: []
    };
    //this.handleClickLike = this.handleClickLike.bind(this);
    this.checkLike = this.checkLike.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      let id = this.props.post.id;
      axios.get(`api/like/getLikes?postId=${id}`)
      .then((data) => {
        this.setState({userLikes: data.data});
        this.setState({likes: this.state.userLikes.length});
        data.data.forEach(obj => {
          if(obj.userId === this.props.user.id) {
            this.setState({userLike: 'You liked this'});
          }
        })
      })
      .catch(err => {
        console.log(err, 'could not get likes')
      })
    }, 500);
  }

  checkLike() {
		let userId = this.props.user.id;
    let postId = this.props.post.id;
    //console.log(this.state.userLike, 'liked status')
    if(this.state.userLike === '') {
      axios.post('api/like/likePost', {
        userId: userId,
        postId: postId,
      })
      .then(data => {
        this.setState({likes: this.state.likes + 1});
        this.setState({userLike: 'You liked this'})
        axios.get(`api/like/getLikes?postId=${postId}`)
        .then((data) => {
          this.setState({userLikes: data.data});
          this.setState({likes: this.state.userLikes.length});
          data.data.forEach(obj => {
            if(obj.userId === this.props.user.id) {
              this.setState({userLike: 'You liked this'});
            }
          })
        })
        .catch(err => {
          console.log(err, 'could not get likes')
        })
      })
      .catch(err => {
        console.log('like request did not go through');
      })
    } else {
      axios.delete(`api/like/unlikePost?userId=${userId}&postId=${postId}`)
      .then(data => {
        this.setState({likes: this.state.likes - 1});
        this.setState({userLike: ''});
        axios.get(`api/like/getLikes?postId=${postId}`)
        .then((data) => {
          this.setState({userLikes: data.data});
          this.setState({likes: this.state.userLikes.length});
          data.data.forEach(obj => {
            if(obj.userId === this.props.user.id) {
              this.setState({userLike: 'You liked this'});
            }
          })
        })
        .catch(err => {
          console.log(err, 'could not get likes')
        })
      })
      .catch(err => {
        console.log('unlike request did not go through');
      })
    }
	}

  render() {
    return (
      <div onClick={this.checkLike} className="likes-container">
        <span>
          {this.state.likes}
        </span>
        <span>
          <img src="./images/like.jpg" height="25" width="25" />
        </span>
        <span>{this.state.userLike}</span>
        <div className="user-likes">
          {/* {this.state.userLikes.map((user, key) => {
            <span user={user} key={key}>this works</span>
          })} */}
        </div>
      </div>
    )
  }
}

export default FeedListEntryLikes;