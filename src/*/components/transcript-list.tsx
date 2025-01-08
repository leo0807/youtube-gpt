import { memo, useMemo } from "react"
import TranscriptItem from "./transcript-item"

type Transcript = {
    text: string
    startTime: number
    endTime: number
}

interface TranscriptListProps {
    transcript: Transcript[]
    searchInput: string
}

const TranscriptList = ({ transcript, searchInput }: TranscriptListProps) => {

    const filteredTranscripts = useMemo(() => {
        return searchInput ? transcript.filter(item => item.text.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())) : transcript
    }, [transcript, searchInput])


    if (filteredTranscripts.length === 0) {
        return (
          <div className="flex justify-center items-center w-full h-32">
            <span>No results found.</span>
          </div>
        )
    }
    
    return (
        <div>
            {filteredTranscripts.map((item: Transcript) => (
                <TranscriptItem key={item.startTime} item={item} searchInput={searchInput} />
            ))}
        </div>
    )
}

export default memo(TranscriptList, (prevProps, nextProps) => prevProps.transcript === nextProps.transcript && prevProps.searchInput === nextProps.searchInput)