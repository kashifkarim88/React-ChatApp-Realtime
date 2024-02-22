import React from 'react'
import "../scss/message.scss"

function Message({user,message,classs}) {
  if(user){
  return <>
    <div className={`message-wrapper ${classs}`}>
      {
        `${user}: ${message}`
      }
    </div>
  </>
  }
  else{
  return <>
    <div className={`message-wrapper ${classs}`}>
      {
        `You: ${message}`
      }
    </div>
  </>
  }
}

export default Message