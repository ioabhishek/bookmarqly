import { Bookmark } from "lucide-react"
import { FC } from "react"

interface YoutubeInjectProps {}

const YoutubeInject: FC<YoutubeInjectProps> = ({}) => {
  return (
    <div
      id="youtube-inject"
      className=" w-9 h-9 rounded-full flex items-center justify-center bg-black border border-white shadow-lg">
      <Bookmark className="w-5 h-5" fill="white" />
    </div>
  )
}

export default YoutubeInject
