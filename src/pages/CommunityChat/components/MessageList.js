import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message'


class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                      <li  key={message.id} className="message">
                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                      </li>
                    )
                })}
            </ul>
        )
    }
}
export default MessageList