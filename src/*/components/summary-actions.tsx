
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import React from 'react'
import { useSummary } from '~*/contexts/summary-context'
import { models, prompts, type Model, type Prompt } from '~*/lib/constants'
import TooltipWrapper from './ui/tooltip-wrapper'
import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useCopyToClipboard } from '~*/lib/hooks/use-copy-to-clipboard'

const SummaryActions = () => {
    const { 
        summaryContent,
        summaryIsGenerating,
        summaryIsError,
        summaryPrompt,
        summaryModel,
        setSummaryModel,
        setSummaryPrompt,
        generateSummary
     } = useSummary()

     const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

     const copySummary = () => {
        if (isCopied || !summaryContent || summaryIsGenerating) {
            return
        }

        copyToClipboard(summaryContent)
     }

    return (
        <div className="flex flex-row w-full justify-between items-center sticky top-0 bg-white pt-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
            <Select
                value={summaryModel.value}
                onValueChange={(value) =>
                setSummaryModel(models.find((model) => model.value === value))
                }>
                <SelectTrigger className="w-fit space-x-3">
                <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                {models.map((model: Model) => (
                    <SelectItem key={model.value} value={model.value}>
                    <div className="flex flex-row items-center">
                        <div className="mr-2">{model.icon}</div>
                        {model.label}
                    </div>
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>

            <div className="flex flex-row space-x-2">
                <TooltipWrapper text={"Generate Summary"}>
                    <Button variant="outline" size="icon" onClick={generateSummary} disabled={summaryIsGenerating}>
                        <ReloadIcon className="h-4 w-4 opacity-60" />
                    </Button>
                </TooltipWrapper>

                <TooltipWrapper text={"Copy Summary"}>
                    <Button variant="outline" size="icon" onClick={copySummary} disabled={summaryIsGenerating}>
                        {isCopied ? <CheckIcon className="h-4 w-4 opacity-60" /> : <ClipboardCopyIcon className="h-4 w-4 opacity-60" />}
                    </Button>
                </TooltipWrapper>

                <Select
                    value={summaryPrompt.value}
                    onValueChange={(value) =>
                    setSummaryPrompt(prompts.find((prompt) => prompt.value === value))
                    }>
                    <SelectTrigger className="w-fit space-x-3">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {prompts.map((prompt: Prompt) => (
                        <SelectItem key={prompt.value} value={prompt.value}>
                            {prompt.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default SummaryActions