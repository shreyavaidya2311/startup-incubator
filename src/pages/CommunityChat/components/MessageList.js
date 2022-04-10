import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message'

class MessageList extends React.Component {
    componenetWilUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
    }

    componentDidUpdate() {
        if(this.shouldScrollBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        if(!this.props.currRoomId) {
            <div className="message-list">
                <div className="join-room">
                    &larr; Join a room!
                </div>
            </div>
        }
        return(
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return <Message key={index} user={message.senderId} text={message.text} />
                })}
            </div>
        )
    }
}

export default MessageList