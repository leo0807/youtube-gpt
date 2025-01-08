import { useState } from "react"

export interface UseCopyToClipboardProps {
    timeout?: number
}

export const useCopyToClipboard = ({ timeout = 2000 }: UseCopyToClipboardProps) => {
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const copyToClipboard = (value: string) => {

        if (typeof window === undefined || !window.navigator.clipboard.writeText) {
            return
        }
        if (!value) {
            return
        }
        navigator.clipboard.writeText(value)
        .then(() => {
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, timeout)
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error)
        })
    }

    return { isCopied, copyToClipboard }
}