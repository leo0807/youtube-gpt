import { useState, useContext, createContext, useMemo } from "react"
import type { Transcript } from "~*/lib/constants"
import { useExtension } from "./extension-context"
import { cleanJsonTranscript } from "~utils/functions"

interface TranscriptContext {
    transcriptSearch: string
    setTranscriptSearch: (transcriptSearch: string) => void
    transcriptJson: Transcript[]
}

const TranscriptContext = createContext<TranscriptContext | undefined>(undefined)

export const useTranscript = () => {
    const context = useContext(TranscriptContext)
    if (!context) {
        throw new Error("useTranscript must be used within a TranscriptProvider")
    }
    return context
}

interface TranscriptProviderProps {
    children: React.ReactNode
}

export const TranscriptProvider = ({ children }: TranscriptProviderProps) => {
    const [transcriptSearch, setTranscriptSearch] = useState<string>("")

    const { extensionLoading, extensionData } = useExtension()  
 
    const transcriptJson = useMemo(() => {
        if (!extensionLoading && extensionData && extensionData.transcript) 
            return cleanJsonTranscript(extensionData.transcript)
        return []
    }, [extensionLoading, extensionData])

    const value = {
        transcriptSearch,
        setTranscriptSearch,
        transcriptJson
    }
    return <TranscriptContext.Provider value={value}>{children}</TranscriptContext.Provider>
}