import React from 'react'

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

const ChatWrapper = () => {
    return (
        <ChatEngineWrapper>
            <ChatSocket 
                projectID='28bbe502-4fce-4308-b23b-93c592c9be3f'
                chatID='110487'
                chatAccessKey='ca-840a3ed9-70c9-4a5c-af89-cc9016200581'
                //somehow get the actual username of the session
                senderUsername='getusername'
            />
            <ChatFeed activeChat='110487' />
        </ChatEngineWrapper>
    )
}

export default ChatWrapper