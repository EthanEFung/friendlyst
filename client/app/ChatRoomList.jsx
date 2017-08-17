import React from 'react'
import ChatRoomListEntry from './ChatRoomListEntry.jsx'

const ChatRoomList = (props) => {
  //each room will contain the user socket and the friend username
  //console.log('this is the userid', props.userId)
  return (
    <div className="chatroom-container">
      {
        props.chatRooms.map(chatRoom => (
          <ChatRoomListEntry handleVideoClick={props.handleVideoClick} room={chatRoom} closeRoom={props.closeRoom} userId={props.userId} />
        ))
      }
    </div>
  )
}

export default ChatRoomList