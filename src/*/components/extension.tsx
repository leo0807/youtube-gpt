import React, { useEffect } from 'react'
import { Collapsible, CollapsibleContent } from './ui/collapsible'
import { useExtension } from '~*/contexts/extension-context'
import { getVideoData } from '~utils/functions'
import ExtensionActions from './extension-actions'
import ExtensionPanels from './extension-panels'

const Extension = () => {

  const { 
    extensionContainer, 
    extensionIsOpen, 
    extensionTheme, 
    extensionLoading, 
    extensionPanel, 
    extensionVideoId, 
    extensionData, 
    setExtensionContainer,
    setExtensionIsOpen,
    setExtensionTheme,
    setExtensionLoading,
    setExtensionPanel,
    setExtensionVideoId,
    setExtensionData,
  } = useExtension()

  useEffect(() => {
    const getVideoId = () => {
      return new URLSearchParams(window.location.search).get('v')
    }

    const fetchVideoData = async () => {
      const id = getVideoId()

      if (id && id !== extensionVideoId) {
        setExtensionVideoId(id)
        setExtensionLoading(true)
        const data = await getVideoData(id)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }

    fetchVideoData()
    const intervalId = setInterval(fetchVideoData, 1000 * 2)

    return () => clearInterval(intervalId) 
  }, [ extensionVideoId ])

  useEffect(() => {
    const getCssVariables = (name: string) => {
      const rootStyle = getComputedStyle(document.documentElement)
      return rootStyle.getPropertyValue(name).trim()
    }

    const backgroundColor = getCssVariables('--yt-spec-base-background')

    if (backgroundColor === '#fff') {
      setExtensionTheme('light')
    } else {
      setExtensionTheme('dark')
    }
  }, [])

  if (!extensionTheme) return null
  
  return (
    <main ref={setExtensionContainer} className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
      <div className="w-full">
        <Collapsible open={extensionIsOpen} onOpenChange={setExtensionIsOpen} className='space-y-3'>
          <ExtensionActions />  
          <CollapsibleContent className='w-full h-fit max-h-[500px] border border-zinc-200 rounded-md overflow-auto'>
            <ExtensionPanels />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}

export default Extension