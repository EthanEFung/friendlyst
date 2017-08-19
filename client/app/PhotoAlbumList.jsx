/* grab from the bucket the user from email, map and grab the first pic to render */
import React, { Component } from 'react'
import PhotoAlbum from './PhotoAlbum.jsx'
import axios from 'axios';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
};

class PhotoAlbumList extends Component {
  constructor(props) {
    super(props)
    this.handlePhotoAlbumOnClick = this.handlePhotoAlbumOnClick.bind(this)
    this.state = {
      albums: [],
      album: '',
      albumClicked: false
    }
  }

  componentWillMount() {
    const cloudName = 'dyrwrlv2h'
    const resourceType = 'image'
    const tag = `userid_${this.props.user.id}`
    console.log(tag)

    axios.get(`/api/photo/getAllAlbums?id=${this.props.user.id}`).then( (response) => {
      console.log(`response is ${JSON.stringify(response.data)}`)
      this.setState({
        albums: response.data
      })
    }).catch(function (error) {
      console.log(`sad error day ${error}`)
    }) 
  }

  handlePhotoAlbumOnClick(album) {
    this.setState({
      album: album,
      albumClicked: true
    })
  }


  render() {
    console.log
    return (
      <div className='container'>
        <div className='row'>
          <div className="photo-album-section">
            { this.state.albumClicked ? 
              (<div><PhotoAlbum album={this.state.album} /></div>)
            :
              (this.state.albums.map( (album, i) => {
                return (
                  <div className='col-sm-4'>
                    <div className="photo-album-area">
                      <img src={album.photos[0].secure_url} className="photo-album center-block img-responsive" onClick={this.handlePhotoAlbumOnClick.bind(this, album)}/>
                      <div className="photo-album-title text-right">
                        <div className='album-text'>{album.name}</div>
                      </div>
                    </div>
                  </div>
                )
              }))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PhotoAlbumList);

//make a clickable link to each that renders a new 