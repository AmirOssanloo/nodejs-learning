import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TweenLite, Power2} from 'gsap';
import {isValidString} from '../../utils/string';
import Message from '../../components/message/Message';
import withContainer from '../../hoc/withContainer';
import styles from './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props)

    this.roomPanelRef = React.createRef();
    this.chatPanelRef = React.createRef();
    this.messageInput = React.createRef();
    this.messagesContainer = React.createRef();
    this.onSendMessageClick = this.onSendMessageClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    let timelineIn = this.props.timelineIn;

    // Panel in
    timelineIn.from(this.chatPanelRef.current, 0.9, {x: 480, ease: Power2.easeInOut});
    timelineIn.from(this.roomPanelRef.current, 0.9, {x: -200, ease: Power2.easeInOut}, '-= 0.9');
    
    this.props.socket.on('addMessage', message => {
      this.props.onAddMessage(message);
    });
  }

  componentDidUpdate() {
    if (this.messagesContainer.current.scrollTop < 200)
      TweenLite.to(this.messagesContainer.current, 0.2, {scrollTop: 0, ease: Power2.easeInOut});
  }

  onSendMessageClick() {
    if (!isValidString(this.messageInput.current.value))
      return console.log('Message must be a valid string');

    let payload = {
      username: this.props.username,
      text: this.messageInput.current.value
    }

    this.props.socket.emit('createMessage', payload, () => {
      TweenLite.to(this.messagesContainer.current, 0.2, {scrollTop: 0, ease: Power2.easeInOut});
      this.messageInput.current.value = '';
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter')
      this.onSendMessageClick(null);
  }

  render() {
    let messages = this.props.messages.map((message, index) =>
      <Message key={index} params={message} />);

    return (
      <React.Fragment>
        <div id={styles["room-title"]} ref={this.roomPanelRef}>
          <span>Room: {this.props.room.toUpperCase()}</span>
        </div>
        <div id={styles["chat-panel"]} ref={this.chatPanelRef} onKeyPress={this.onKeyPress}>
          <div id={styles["message-input-container"]}>
            <div className={styles["message-input"]}>
              <input
                ref={this.messageInput}
                name="message"
                type="text"
                placeholder="Message..."
                autoComplete="off"
                autoFocus
                />

              <button className="send-message" onClick={this.onSendMessageClick}>Send</button>
            </div> 
          </div>

          <ul id={styles["messages-container"]} ref={this.messagesContainer}>
            {messages}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
    username: state.username,
    room: state.room,
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsername: (username) => dispatch({type: 'SET_USERNAME', value: username}),
    setRoom: (room) => dispatch({type: 'SET_ROOM', value: room}),
    onAddMessage: (message) => dispatch({type: 'ADD_MESSAGE', value: message})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withContainer(Chat));