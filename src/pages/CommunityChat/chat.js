import React from 'react'
import Chatkit from '@puser/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator} from './config'
import { ThirtyFpsSelect } from '@mui/icons-material'

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoomId: null,
      joinableRooms: [],
      joinedRooms: [],
      messages: []
    }
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.SendMessage = this.SendMessage.bind(this)
  }
}