import React from 'react'
import { ChatProvider } from '~*/contexts/chat-context'
import { ExtensionProvider } from '~*/contexts/extension-context'
import { SummaryProvider } from '~*/contexts/summary-context'
import { TranscriptProvider } from '~*/contexts/transcript-context'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ExtensionProvider>
        <ChatProvider>
            <SummaryProvider>
                <TranscriptProvider>
                    {children}
                </TranscriptProvider>
            </SummaryProvider>
        </ChatProvider>
    </ExtensionProvider>
  )
}

export default Provider