import { useContext, useState } from "react"
import { createContext } from "react"
import { type Model, type Message, models } from "~*/lib/constants"

interface ChatState {
    chatModel: Model
    chatIsGenerating: boolean
    chatIsError: boolean
    chatMessages: Message[] | undefined
    chatPrompt: string
    chatSuggestions: string[]
    chatIsGeneratingSuggestions: boolean
    chatIsErrorSuggestions: boolean
}

const initialState: ChatState = {
    chatModel: models[0],
    chatIsGenerating: false,
    chatIsError: false,
    chatMessages: [],
    chatPrompt: "",
    chatSuggestions: [],
    chatIsGeneratingSuggestions: false,
    chatIsErrorSuggestions: false
}

interface ChatActions {
    setChatModel: (model: Model) => void
    setChatIsGenerating: (isGenerating: boolean) => void
    setChatIsError: (isError: boolean) => void
    setChatMessages: (messages: Message[]) => void
    setChatPrompt: (prompt: string) => void
    setChatSuggestions: (suggestions: string[]) => void
    setChatIsGeneratingSuggestions: (isGeneratingSuggestions: boolean) => void
    setChatIsErrorSuggestions: (isErrorSuggestions: boolean) => void
}

interface ChatContext extends ChatState, ChatActions {}

const ChatContext = createContext<ChatContext | undefined>(undefined)

const useChat = () => {
    const context = useContext(ChatContext)
    if (!context) throw new Error("useChat must be used within a ChatProvider")
    return context
}

interface ChatProviderProps {
    children: React.ReactNode
}

const ChatProvider = ({ children }: ChatProviderProps) => {
    const [chatModel, setChatModel] = useState<Model>(initialState.chatModel)
    const [chatIsGenerating, setChatIsGenerating] = useState<boolean>(initialState.chatIsGenerating)
    const [chatIsError, setChatIsError] = useState<boolean>(initialState.chatIsError)
    const [chatMessages, setChatMessages] = useState<Message[]>(initialState.chatMessages)
    const [chatPrompt, setChatPrompt] = useState<string>(initialState.chatPrompt)
    const [chatSuggestions, setChatSuggestions] = useState<string[]>(initialState.chatSuggestions)
    const [chatIsGeneratingSuggestions, setChatIsGeneratingSuggestions] = useState<boolean>(initialState.chatIsGeneratingSuggestions)
    const [chatIsErrorSuggestions, setChatIsErrorSuggestions] = useState<boolean>(initialState.chatIsErrorSuggestions)

    const value = {
        chatModel,
        setChatModel,
        chatIsGenerating,
        setChatIsGenerating,
        chatIsError,
        setChatIsError,
        chatMessages,
        setChatMessages,
        chatPrompt,
        setChatPrompt,
        chatSuggestions,
        setChatSuggestions,
        chatIsGeneratingSuggestions,
        setChatIsGeneratingSuggestions,
        chatIsErrorSuggestions,
        setChatIsErrorSuggestions
    }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export { ChatProvider, useChat }