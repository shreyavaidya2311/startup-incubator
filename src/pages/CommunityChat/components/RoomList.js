import { ThumbUpSharp } from '@mui/icons-material';
import React from 'react'

class RoomList extends React.Component {
    render() {
        const orderedRooms = [...this.props.room].sort((a,b) => a.id > b.id);
        return (
            <div className="rooms-list">
                <h3> Your rooms: </h3>
                <ul>
                    {orderedRooms.map((room, i) => {
                        const active = this.props.currentRoomID === room.id ? 'active' : '';
                        return (
                            <li key={i} className={'room' + active}>
                                <a href='#' onClick={() => this.props.subscribeToRoom(room.id)}>
                                    # {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList