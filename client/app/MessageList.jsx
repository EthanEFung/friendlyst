import React from 'react'
import MessageListEntry from './MessageListEntry.jsx'
import Push from 'push.js'


export default class MessageList extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="message-list">
        {
          this.props.messages.map(message => <MessageListEntry message={message} friend={this.props.friend} user={this.props.user} />)
        }
      </div>
    )
  }
}