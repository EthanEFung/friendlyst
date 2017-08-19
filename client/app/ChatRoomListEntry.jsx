import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import MessageList from './MessageList.jsx'
import axios from 'axios'
// import VIDEO_KEYS from '../../VIDEO_KEYS.js'
import Push from 'push.js'
import Dropzone from 'react-dropzone';

class ChatRoomListEntry extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      messages: [],
      friendId: '',
      showCallButton: false,
    }
    this.handleVideoClick = this.handleVideoClick.bind(this)
    this.makeCall = this.makeCall.bind(this)
    this.login = this.login.bind(this)
    this.endCall = this.endCall.bind(this)
    this.minimize = this.minimize.bind(this)
    this.maximize = this.maximize.bind(this)
  }

  componentDidMount() {

    this.login()

    this.props.room.user.on('private message received', msg => {
      this.setState({
        messages: [...this.state.messages, msg]
      }, () => {
        let chatWindow = document.getElementById('chatWindow')
        chatWindow.scrollTop = chatWindow.scrollHeight
      })
      Push.create(`New message from ${this.props.room.friend}!`, {
        body: `${this.props.room.friend} sent you a message on Friendlyst!`,
        timeout: 4000,
        onClick: function() {
          window.focus()
          this.close()
        }
      })
    })

    //this is finding a user by id
    axios.get(`/api/user/getUserFriend`, {
      params: {
        nickname: this.props.room.friend
      }
    })
    .then(({ data }) => {
      this.setState({
        friendId: data.id
      })
      axios.get('/api/message/getAllMessage', {
        params: {
          friendId: this.state.friendId,
          userId: this.props.userId,
        }
      })
      .then(({ data }) => {
        this.setState({
          messages: data
        }, () => {
          let chatWindow = document.getElementById('chatWindow')
          chatWindow.scrollTop = chatWindow.scrollHeight
        })
      })
    })
    
  }

  sendPrivateMessage(text) {
    let msg = {
      message: text,
      to: this.props.room.friend,
      from: this.props.room.user.nickname,
      friendId: this.state.friendId,
      userId: this.props.userId
    }

    axios.post('/api/message/postMessage', msg)

    this.props.room.user.emit('private message', msg)

    if (msg.to === msg.from) {
      return
    }

    this.setState({
      messages: [...this.state.messages, msg]
    }, () => {
      let chatWindow = document.getElementById('chatWindow')
      chatWindow.scrollTop = chatWindow.scrollHeight
    })
  }

  closeCurrentRoom() {
    let room = {
      friend: this.props.room.friend,
      user: this.props.room.user
    }

    this.props.closeRoom(room)
  }

  handleEnter(e) {
    if (e.target.value.length < 1) {
      return
    }
    if (e.key === 'Enter') {
      this.sendPrivateMessage(e.target.value)
      e.target.value = ''
    }
  }

  handleVideoClick(e) {
    this.makeCall()
  }

  login() {
    let app = this
    var phone = window.phone = PHONE({
      number: this.props.room.user.nickname || 'ANONYMOUS', // TO DO : ADD IN THE USERNAME HERE
      publish_key:  process.env.PUBLISH,
      // || VIDEO_KEYS.publish_key,
      subscribe_key:  process.env.SUBSCRIBE
      // || VIDEO_KEYS.subscribe_key
    })
    phone.receive(function(session) {
      session.connected(function(session) {
        document.getElementById('vid-box').appendChild(session.video)
        app.setState({
          showCallButton: true
        })
      })
      session.ended(function(session) {
        document.getElementById('vid-box').innerHTML = ''
        app.setState({
          showCallButton: false
        })
      })
    })

    return false
  }

  makeCall() {
    if (!window.phone) alert('' + this.props.room.user.nickname)
    else phone.dial(this.props.room.friend)
    this.setState({
      showCallButton: true
    })
    return false
  }

  endCall() {
    var ctrl = window.ctrl = CONTROLLER(phone);
    ctrl.hangup();
    this.setState({
      showCallButton: false
    })
  }

  muteCall() {
    var ctrl = window.ctrl = CONTROLLER(phone)
    ctrl.toggleAudio()
  }

  minimize() {
    $('.chatroom').hide()
    $(".chatroom-minimize").show()
  }

  maximize() {
    $('.chatroom').show()
    $(".chatroom-minimize").hide()
  }

  render() {
    return (
      <div>
        <div>
          <div id='vid-box'></div>
          {this.state.showCallButton ? <img src='./images/hangup.png' id='end' onClick={this.endCall} /> : <div></div>}
          {this.state.showCallButton ? <img src='./images/mute.png' id='mute' onClick={this.muteCall} /> : <div></div>}
        </div>
        <div className="chatroom">
          <div className="chatroom-header" onClick={this.minimize}>
            <div className="chatroom-header-name">{this.props.room.friend}</div>
            <img id='video-chat-button' src='./images/video-camera.png' onClick={this.handleVideoClick} />
            
            <div onClick={this.closeCurrentRoom.bind(this)} className="chatroom-header-button">x</div>
          </div>

          <div id='chatWindow' className="private-message-area">
            <MessageList messages={this.state.messages} friend={this.props.room.friend} user={this.props.room.user} />
          </div>

          <div className="chatroom-inputs">
            <input onKeyPress={this.handleEnter.bind(this)} placeholder="Type a message..." />
          </div>
        </div>

        <div className='chatroom-minimize' style={{ display: 'none' }} onClick={this.maximize}>
          <p onClick={this.maximize}> {this.props.room.friend} </p>
        </div>
      </div>
    )
  }
}

export default ChatRoomListEntry