/* grab from the bucket the user from email, map and grab the first pic to render */
import React, { Component } from 'react'
import PhotoAlbum from './PhotoAlbum.jsx'
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import Dropzone from 'react-dropzone'



const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    showModal: false
  }
};

class PhotoAlbumList extends Component {
  constructor(props) {
    super(props)
    this.handlePhotoAlbumOnClick = this.handlePhotoAlbumOnClick.bind(this)
    this.openPhotoModal = this.openPhotoModal.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.setAlbumName = this.setAlbumName.bind(this);
    this.state = {
      albums: [],
      album: '',
      albumClicked: false,
      showModal: false,
      newAlbumName: '',
      showEmptyAlbumNameMessage: false,
      emptyAlbumMessage: 'You must give your album a title',
      previewAlbum: []
    }
  }

  componentDidMount() {
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

  closePhotoModal() {
    this.setState({
      showModal:false,
      newAlbumName: '',
      albums: [ {name: this.state.newAlbumName, path: `${this.props.user.id}/${this.state.newAlbumName}`, photos: this.state.previewAlbum.slice()} ,...this.state.albums]
    })
  }

  openPhotoModal() {
    this.setState({showModal:true});
  }

  setAlbumName(e) {
    this.setState({
      newAlbumName: e.target.value
    })
  }

  handleDrop(files) {
    if (this.state.newAlbumName === '') {
      this.setState({
        showEmptyAlbumNameMessage: true
      })
    } else {
      console.log(`trying to upload new photo album`)
      let component = this
      const uploaders = files.map( (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('tags', `dyrwrlv2h, medium, gist`)
        formData.append('upload_preset', 'twliuw5d')
        formData.append('api_key', '377437738276986')
        formData.append('timestamp', (Date.now() / 1000) | 0)
        console.log(`this is the userid ${JSON.stringify(this.props.user.id)}`)
        formData.append('folder', `${this.props.user.id}/${this.state.newAlbumName}`)

        return axios.post(`https://api.cloudinary.com/v1_1/dyrwrlv2h/image/upload`, formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }).then( (response) => {
          const data = Object.assign({}, response.data)
          const fileURL = data.secure_url
          console.log(`success!!! data is ${JSON.stringify(data)}`)

          let blah = component.state.previewAlbum.slice()
          console.log(`this is blah ${JSON.stringify(blah)}`)
          
          blah.unshift(data)

          component.setState({
            previewAlbum: blah
          })
        })
      })
    }
  }

  render() {
    return (
      <div>
        <div className="photo-album-list-section">
          <div className="text-center">
            <ButtonGroup className="profile-button-group">  
              <Button bsStyle="primary" onClick={this.openPhotoModal}>Create Album</Button>{' '}
            </ButtonGroup>
          </div>
            
          <Modal show={this.state.showModal} onHide={this.closePhotoModal} className="photo-modal">
          <Modal.Body>
            Photo Album Title: 
            <input type="text" className="new-album-name" value={this.state.newAlbumName} onChange={this.setAlbumName} />
            <div>{this.state.showEmptyAlbumNameMessage ? (this.state.emptyAlbumMessage) : ('') }</div>
            <Dropzone
              onDrop={this.handleDrop}
              multiple
              accept="image/*"
              className = "photo-album-dropzone"
            >
              { console.log(`this.state.previewAlbum is ${JSON.stringify(this.state.previewAlbum)} and length is ${this.state.previewAlbum.length}`) }
              { this.state.previewAlbum.length > 0 ? 
                (this.state.previewAlbum.map( (image, i) => {
                  console.log(`the image is ${JSON.stringify(image)}`)
                  return (<span className="photo-preview-photo"><img src={image.secure_url} /></span>)
                }))
                :
                (<span></span>)
              }
              <span>Drop Photos In Here!!!</span>
            </Dropzone>
          </Modal.Body>
          </Modal>
        </div>

        <div className='container'>
          <div className='row'>
            <div className="photo-album-section">
              {console.log(`${JSON.stringify(this.state.albums)}`) }
              { this.state.albumClicked ? 
                (<div><PhotoAlbum album={this.state.album} /></div>)
                :
                (this.state.albums.map( (album, i) => {
                    if (album.photos.length !== 0) {
                      return (
                        <div className='col-sm-4'>
                          <div className="photo-album-area">
                            <img src={album.photos[0].secure_url} className="photo-album photo-center img-responsive" onClick={this.handlePhotoAlbumOnClick.bind(this, album)}/>
                            <div className="photo-album-title text-right">
                              <div className='album-text'>{album.name}</div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                }))
              }
            </div>
          </div>
        </div>
      </div>
  )}
}

export default connect(mapStateToProps)(PhotoAlbumList);