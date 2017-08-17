import React, { Component } from 'react'
import Nav from './Nav.jsx'
import { connect } from 'react-redux';
import ProfileFeedListEntry from './ProfileFeedListEntry.jsx';
import FeedListEntry from './FeedListEntry.jsx';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone'

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    user: state.userReducer.user
  }
};

const mapDispatchToProps = (dispatch) => {
	return {
		newUser(user) {
			dispatch({
				type: 'NEW_USER',
				payload: user
      })
    }
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.changePicture = this.changePicture.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  changePicture() {
    let newPic = prompt('Please provide a new picture url.');
    axios.put(`api/user/changePic`, {
      newPic,
      userId: this.props.user.id
    })
      .then(({ data }) => newUser(data))
      .catch(err => console.log(err))   
  }

  handleDrop(files) {
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
        const fileURL = data.secure_url
        console.log(`this is the fileURL ${fileURL}`)
        console.log(`this is the data ${data}`)
        console.log(`this is this.props.user ${JSON.stringify(this.props.user)}`)
        //send an update to the 
        axios.post('/api/user/addOrUpdateProfileImageLink', {
          imgUrl: fileURL,
          user: this.props.user.id,
        }).then(({ data }) => {
          console.log(`data ${JSON.stringify(data)}`)
          this.props.newUser(data)
        })

			})
		})

		axios.all(uploaders).then( () => {
			console.log('image upload complete!!')
		})
	}

  render() {
    return (
      <div className="profile-container">
        <div className="navcopy">
          <Nav />
        </div>
        <div className="profile-info">
          <Dropzone
						onDrop={this.handleDrop}
						multiple
						accept="image/*"
            className = "profile-image"
            style={{"width": "210px", "height": "210px"}}
					>
          <img src={this.props.user.profilePicture} />
          <span className="hover-profile-image">
            <span className="hover-image-text">Update Profile Picture</span>
          </span>
					</Dropzone>
          <br/>
          { /* <Button bsStyle="default" onClick={this.changePicture}>Change Profile Picture</Button> */ }

          <div>Username: {this.props.user.nickname}</div>
          <div>Email: {this.props.user.email}</div>
        </div>
         <div>
           {
             this.props.posts
              .filter(post => post.userId === this.props.user.id)
              .sort((a, b) => b.id - a.id)
              .map(post => {
                return <FeedListEntry key={post.id} post={post} user={this.props.user}/>
              })
           }
        </div> 
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);