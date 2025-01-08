import { cn } from "~*/lib/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Button } from "./ui/button"
import { IconSparkles } from "./ui/icons"

interface EmptyScreenProps {
  className?: string
  setPromptInput: (value: any) => void
}

const exampleMessages = [
  {
    heading: "What is the video about?",
    message: "Can you tell me about the video?"
  },
  {
    heading: "What are the key points?",
    message: "What are the key points of the video?"
  },
  {
    heading: "What are the main takeaways?",
    message: "What are the main takeaways of the video?"
  },
  {
    heading: "What are the main topics?",
    message: "What are the main topics discussed in the video?"
  }
]

export default function EmptyScreen({
  className,
  setPromptInput
}: EmptyScreenProps) {
  return (
    <div className={cn("px-8 mx-auto", className)}>
      <div className="flex flex-col justify-center items-center p-8 -mt-10 w-full rounded-md bg-background">
        <span className="flex items-center mb-8 text-2xl">
          Youtube
          <IconSparkles className="inline mr-0 ml-0.5 w-4 sm:w-5 mb-1" />
          AI
        </span>
        <p className="mb-4 leading-normal text-center opacity-70 text-muted-foreground">
          A conversational AI extension for Youtube videos that allows user to
          interact directly with content. Ask specific questions or seek
          detailed information about any part of the video.
        </p>

        <p className="mb-8 leading-normal opacity-70 text-muted-foreground">
          Try an example:
        </p>

        <div className="flex flex-col justify-start items-start space-y-3">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setPromptInput(message.message)}
              className="h-auto w-full justify-start border-[0.5px] p-3 opacity-80">
              <ArrowRightIcon className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}