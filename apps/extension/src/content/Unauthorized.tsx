import { FC } from "react"

interface UnauthorizedProps {}

const Unauthorized: FC<UnauthorizedProps> = ({}) => {
  return <div>You must be logged in to use this extension</div>
}

export default Unauthorized
