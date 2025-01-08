import React from 'react'
import { useSummary } from '~*/contexts/summary-context'
import SummarySkeleton from './summary-skeleton'
import { Button } from './ui/button'
import Markdown from './markdown'

const SummaryContent = () => {
    const {
        summaryContent,
        summaryIsGenerating,
        generateSummary,
    } = useSummary()
    
    if (!summaryContent && summaryIsGenerating) {        
        return <div className='flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f'>
            <SummarySkeleton />
        </div>
    }
    
    if (!summaryContent && !summaryIsGenerating) {        
     return (
        <div className='flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f'>
            <Button variant='outline' className='w-full h-12' onClick={generateSummary}><span className='text-sm'>Generate Summary</span></Button>
        </div>
     )
    }
    
    return (
        <div className='flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f'>
            <div className='h-[600px] w-full px-3 opacity-80'>
                <Markdown className='pb-6' markdown={summaryContent} />
            </div>
        </div>
    )
}

export default SummaryContent