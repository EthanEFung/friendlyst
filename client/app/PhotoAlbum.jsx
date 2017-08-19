import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import Photo from './Photo.jsx'
import Dropzone from 'react-dropzone'


export default class PhotoAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      album: []
    }
  }

  componentWillMount() {
    this.setState({
      album: this.props.album.photos
    })
  }

  handleDrop() {

  }

  render() {
    return (
      <div className="photo-album-entire-section">

          <Dropzone
						onDrop={this.handleDrop}
						multiple
						accept="image/*"
            className = "profile-image"
            style={{"width": "210px", "height": "210px"}}
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