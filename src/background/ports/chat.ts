import type { PlasmoMessaging } from "@plasmohq/messaging"
import OpenAI from "openai"

const llm = new OpenAI({
    baseURL: "https://api.chatanywhere.tech/v1",
    apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY
})

const SYSTEM = `
You are a helpful assistant, Given the metadata and transcript of a YouTube video. Your primary task is to provide accurate and relevant answers to any questions based on this information. Use the available details effectively to assist users with their inquiries about the video's content, context, or any other related aspects.

START OF METADATA
Video Title: {title}
END OF METADATA

START OF TRANSCRIPT
{transcript}
END OF TRANSCRIPT
`
const createChatCompletion = async (model: string, messages: any, context: any) =>{
    const parsed = context.transcript.events
        .filter((x: { segs: any }) => x.segs)
        .map((x: { segs: any[] }) =>
        x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
        )
        .join(" ")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, " ")

    const SYSTEM_WITH_CONTEXT = SYSTEM.replace(
        "{title}",
        context.metadata.title
    ).replace("{transcript}", parsed)

    messages.unshift({ role: "system", content: SYSTEM_WITH_CONTEXT })

    console.log(11111111,messages)

    return llm.beta.chat.completions.stream({
        messages: messages,
        model: model || "gpt-3.5-turbo",
        stream: true
    })
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
    let cumulativeData = ""

    const messages = req.body.messages
    const model = req.body.model
    const context = req.body.context

    try {
        const completion = await createChatCompletion(model, messages, context)
        
        completion.on("content", (delta, snapshot) => {
        cumulativeData += delta
        res.send({ message: cumulativeData, error: "", isEnd: false })
        })

        completion.on("end", () => {
        res.send({ message: "END", error: "", isEnd: true })
        })
    } catch (error) {
        res.send({ error: "something went wrong" })
    }
}

export default handler