import { useRef } from "react"

const useEnterSubmit = (): {
    formRef: React.RefObject<HTMLFormElement>
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
    onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
} => {
    const formRef = useRef<HTMLFormElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.stopPropagation()
        
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            formRef.current?.requestSubmit()
            e.preventDefault() 
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.stopPropagation()
    }

    return { formRef, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }
}

export default useEnterSubmit