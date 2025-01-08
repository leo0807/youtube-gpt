import React from 'react'
import { Button } from './ui/button'
import { ActivityLogIcon, CardStackPlusIcon, CaretSortIcon, ChatBubbleIcon, CheckIcon, CopyIcon, Link2Icon, Pencil2Icon } from '@radix-ui/react-icons'
import { useExtension } from '../contexts/extension-context'
import TooltipWrapper from './ui/tooltip-wrapper'
import { useCopyToClipboard } from '~*/lib/hooks/use-copy-to-clipboard'
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible'

const ExtensionActions = () => {

  const { setExtensionPanel, extensionIsOpen, setExtensionIsOpen } = useExtension()

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const copyVideoUrl = () => {
    if (isCopied) return
    copyToClipboard(window.location.href)
  }

  return (
    <div className="border border-zinc-200 rounded-md flex items-center justify-between p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
        <CardStackPlusIcon className="h-6 w-6 opacity-50 ml-2" />
        <div className="flex justify-center items-center space-x-2">
            <div className="flex -space-x-px">
            <Button
                variant="outline"
                onClick={() => {
                setExtensionPanel("Summary")
                if (!extensionIsOpen) setExtensionIsOpen(true)
                }}
                className="
            rounded-r-none focus:z-10 bg-transparent space-x-2 items-center">
                <Pencil2Icon className="h-4 w-4 opacity-60" />
                <span className="opacity-90">Summary</span>
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                setExtensionPanel("Transcript")
                if (!extensionIsOpen) setExtensionIsOpen(true)
                }}
                className="
            rounded-r-none focus:z-10 bg-transparent space-x-2 items-center">
                <ActivityLogIcon className="h-4 w-4 opacity-60" />
                <span className="opacity-90">Transcript</span>
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                setExtensionPanel("Chat")
                if (!extensionIsOpen) setExtensionIsOpen(true)
                }}
                className="
            rounded-r-none focus:z-10 bg-transparent space-x-2 items-center">
                <ChatBubbleIcon className="h-4 w-4 opacity-60" />
                <span className="opacity-90">Chat</span>
            </Button>
            </div>
        </div>

        <div className="flex items-center space-x-2">
            <TooltipWrapper text={"Copy Video URL"}>
                <Button variant='outline' size='icon' onClick={() => copyVideoUrl()}>
                    {isCopied ? <CheckIcon className="h-4.5 w-4.5 opacity-60" /> : <Link2Icon className="h-4.5 w-4.5 opacity-60" />}
                </Button>
            </TooltipWrapper>
        </div>

        <CollapsibleTrigger asChild>
            <Button variant='outline' size='icon'>
                <CaretSortIcon className="h-4.5 w-4.5 opacity-60" />
            </Button>
        </CollapsibleTrigger>
    </div>
  )
}

export default ExtensionActions