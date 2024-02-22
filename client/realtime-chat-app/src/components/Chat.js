import React, { useEffect, useState } from 'react'
import { user } from './Login';
import ReactScrollToBottom from "react-scroll-to-bottom"
import '../scss/chat.scss';
import MessagesBox from './Message.js';
import SendIcon from '@mui/icons-material/Send';
import socketIO from 'socket.io-client';
const ENDPOINT = "http://localhost:5000";
let socket;
function Chat() {
  const [Message, setMessage] = useState("");
  const [userMessages, setUserMessage] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log(`connected ${user}`)
      setId(socket.id)
    })

    socket.emit("joined", { user })

    socket.on("welcome", (data) => {
      setUserMessage(prevUserMessages => [...prevUserMessages, data])
      console.log(`${data.user} --- ${data.message}`)
    })
    socket.on("user joined", (data) => {
      setUserMessage(prevUserMessages => [...prevUserMessages, data])
      console.log(`${data.user} ----> ${data.message}`)
    })
    socket.on("leave", (data) => {
      setUserMessage(prevUserMessages => [...prevUserMessages, data])
      console.log(`${data.user} ---> ${data.message}`)
    })

    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [])

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setUserMessage(prevUserMessages => [...prevUserMessages, data])
      console.log(data.user, data.message, data.id)
    })

    return () => {
      socket.off()
    }
  }, [userMessages])

  const sendMessage = () => {
    socket.emit("message", { message: Message, id: id });
    console.log("ID", id)
    setMessage("")
  }
  return <>
    <div className="chats-wrapper">
      <div className="chats-container">
        <div className="chats-header">
          <h2 className='connected-user'>{user}</h2>
        </div>
        <ReactScrollToBottom className="chat-box">
          {
            userMessages.map((items, i) => (
              <MessagesBox key={i} user={items.id === id ? "" : items.user} message={items.message} classs={items.id === id ? "right" : "left"} />
            )
            )
          }
        </ReactScrollToBottom>
        <div className="input-box">
          <textarea
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevents the default behavior of the Enter key
                sendMessage();
              }
            }}
            className='message-input'
            value={Message}
            type="text"
            placeholder='message'
            onChange={(e) => setMessage(e.target.value)}
          />

          <SendIcon style={{ color: "cadetblue" }} onClick={sendMessage} />
        </div>
      </div>
    </div>
  </>
}

export default Chat