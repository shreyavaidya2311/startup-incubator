import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatWrapper from './ChatWrapper';

function CommunityChat() {
	return (
        <ChatWrapper>
            <ChatEngine
                projectID='28bbe502-4fce-4308-b23b-93c592c9be3f'
                userName='Nim09911'
                userSecret='nimit'
            />
        </ChatWrapper>
	);
}

export default CommunityChat;