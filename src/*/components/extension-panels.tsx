import React from 'react'
import { useExtension } from '~*/contexts/extension-context'
import Summary from './summary'
import Transcript from './transcript'
import Chat from './chat'

const ExtensionPanels = () => {
  const { extensionPanel } = useExtension()

  return (
    <div>
      {extensionPanel === 'Summary' && <Summary />}
      {extensionPanel === 'Transcript' && <Transcript />}
      {extensionPanel === 'Chat' && <Chat />}
    </div>
  )
}

export default ExtensionPanels