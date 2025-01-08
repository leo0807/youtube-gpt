
import React from 'react'
import {TooltipTrigger, Tooltip, TooltipContent, TooltipProvider } from './tooltip'

const TooltipWrapper = ({ children, text }) => {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p className='text-xs'>
                    {text}
                </p>
            </TooltipContent>   
        </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper