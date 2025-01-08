import React, { useRef } from 'react'
import TranscriptActions from './transcript-actions'
import TranscriptContent from './transcript-content'

const Transcript = () => {

    const player = document.querySelector('video')
    const transcriptListRef = useRef<HTMLDivElement>(null)

    const jumpCurrentTime = () => {
        if (!player || !transcriptListRef.current) return
        const time = Math.round(1000 * player.currentTime)
        const itemContainer = transcriptListRef.current.firstElementChild as HTMLElement
        if (itemContainer) {
            const children = Array.from(itemContainer.children) as HTMLElement[]
            const targetElement = children.find((child: HTMLElement) => {
                const startTime = parseInt(child.getAttribute('data-start-time') || '0', 10)
                const endTime = parseInt(child.getAttribute('data-end-time') || '0', 10)
                return time >= startTime && time <= endTime
            })
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                targetElement.classList.add('bg-zinc-100')
                targetElement.classList.add('dark:bg-[#141414]')
                targetElement.classList.add('transition-all')
            
                setTimeout(() => {                
                    targetElement.classList.add('bg-zinc-100')
                    targetElement.classList.add('dark:bg-[#141414]')
                    targetElement.classList.add('transition-all')
                }, 1000 * 4)
            }3
        }
    }

  return (
    <>
        <TranscriptActions jumpCurrentTime={jumpCurrentTime} />
        <TranscriptContent ref={transcriptListRef} />
    </>
  )
}

export default Transcript
