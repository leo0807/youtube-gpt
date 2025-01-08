import { usePort } from '@plasmohq/messaging/hook'
import React, { useEffect, useRef } from 'react'
import { useChat } from '~*/contexts/chat-context'
import Textarea from "react-textarea-autosize"
import { cn } from '~*/lib/utils'
import useEnterSubmit from '~*/lib/hooks/use-enter-submit'
import TooltipWrapper from './ui/tooltip-wrapper'
import { Send } from 'lucide-react'
import { Button } from './ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useExtension } from '~*/contexts/extension-context'
interface ChatPromptFormProps {
    className?: string
}   

const ChatPromptForm = ({ className }: ChatPromptFormProps) => {

    const port = usePort("chat")

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const { extensionData } = useExtension()
    const {
        chatMessages,
        chatPrompt,
        setChatPrompt,
        setChatMessages,
        setChatIsGenerating,
        setChatIsError,
        chatModel,
        setChatModel
    } = useChat()

    const gengerateChat = async (model: string, messages: any) => {
        setChatIsGenerating(true)
        setChatIsError(false)
        await port.send({
            model,
            messages,
            context: extensionData
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (window.innerWidth < 600) {
            e.target["message"]?.blur()
        }

        const value = chatPrompt.trim()
        setChatPrompt("")
        if (!value) return

        const initialMessages = [...chatMessages, {
            role: "user",
            content: value
        }]

        setChatMessages(initialMessages)
        await gengerateChat(chatModel.content, initialMessages)
    }

    const { formRef, onKeyDown, onKeyUp } = useEnterSubmit()

    useEffect(() => {
        if (port.data?.message !== undefined && port.data.isEnd === false) {
          if (chatMessages[chatMessages.length - 1].role === "user") {
            setChatMessages([
              ...chatMessages,
              {
                role: "assistant",
                content: ""
              }
            ])
          } else {
            const newMessages = [...chatMessages]
            newMessages[newMessages.length - 1].content = port.data.message
            setChatMessages(newMessages)
          }
        } else {
          setChatIsGenerating(false)
        }
    
        setChatIsError(false)
      }, [port.data?.message])
    
      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, [])

    return (
        <form ref={formRef} className={cn("absolute bottom-0 z-10 p-4 w-full bg-white", className)} onSubmit={handleSubmit}>
            <div className='flex overflow-hidden relative flex-col w-full max-h-60 rounded-md border grow border-zinc-200'>
                <Textarea 
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    placeholder='Ask a question'
                    className='min-h-[50px] w-full resize-none bg-transparent px-6 py-6 focus-within:outline-none text-[12px]'
                    autoFocus
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    name='message'
                    rows={1}
                    value={chatPrompt} 
                    onChange={(e) => setChatPrompt(e.target.value)} />
            </div>
            <div className='absolute right-2 top-8 pr-4'>
                <TooltipWrapper text='Send message'>
                    <Button type='submit' size='icon' variant='outline' disabled={!chatPrompt} className='size-[32px]'>
                        <PaperPlaneIcon className='w-4.5 h-4.5' />
                    </Button>
                </TooltipWrapper>
            </div>
        </form>
    )
}

export default ChatPromptForm