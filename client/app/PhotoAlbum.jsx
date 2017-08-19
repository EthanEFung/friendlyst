import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import Photo from './Photo.jsx'
import Dropzone from 'react-dropzone'


export default class PhotoAlbum extends Component {
  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.state = {
      album: []
    }
  }

  componentWillMount() {
    this.setState({
      album: this.props.album.photos
    })
  }

  handleDrop(files) {
    let component = this
    const uploaders = files.map( (file) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('tags', `dyrwrlv2h, medium, gist`)
		formData.append('upload_preset', 'twliuw5d')
		formData.append('api_key', '377437738276986')
    formData.append('timestamp', (Date.now() / 1000) | 0)
    console.log(`this is the album path ${JSON.stringify(component.props.album.path)}`)
    formData.append('folder', component.props.album.path)

		return axios.post(`https://api.cloudinary.com/v1_1/dyrwrlv2h/image/upload`, formData, {
			headers: { "X-Requested-With": "XMLHttpRequest" }
		}).then( (response) => {
      const data = response.data
      const fileURL = data.secure_url
      this.setState({
        album: [data,...this.state.album]
      })
    })
		})
  }

  render() {
    return (
      <div className="photo-album-entire-section">

          <Dropzone
						onDrop={this.handleDrop}
						multiple
						accept="image/*"
            className = "photo-album-dropzone"
					>
          <span className="hover-profile-image">
            <span className="hover-image-text">Update Profile Picture</span>
          </span>
					</Dropzone>
        {this.state.album.map( (image, i) => (<Photo image={image} key={i}/>))}
      </div>
    )
  }
}