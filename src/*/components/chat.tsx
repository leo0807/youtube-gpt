import React from 'react'
import ChatAction from './chat-actions'
import ChatList from './chat-list'
import ChatPromptForm from './chat-prompt-form'

const Chat = () => {
  return (
    <div className='w-full h-[498px] relative bg-white'>
        <ChatAction />
        <ChatList />
        <ChatPromptForm />
    </div>
  )
}

export default Chat