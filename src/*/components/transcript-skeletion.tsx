import { Skeleton } from "./ui/skeleton"

const TranscriptSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: 16 }).map((_, index) => (
        <div className="flex flex-col w-full justify-between items-center p-3 border-[0.5px] rounded-md border-zinc-200 space-y-4">
          <div className="w-full flex flex-row items-center justify-between">
            <Skeleton key={index} className="h-8 w-32" />
          </div>
          <Skeleton key={index} className="h-36 w-full" />
        </div>
      ))}
    </div>
  )
}
export default TranscriptSkeleton