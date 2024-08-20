// import { useEffect, useState } from "react"
// import { Button } from "./components/ui/button"

import toast, { Toaster } from "react-hot-toast"
import { Button } from "./components/ui/button"

// interface Cookie {
//   name: string
//   value: string
//   [key: string]: any
// }

const App: React.FC = () => {
  // const [cookies, setCookies] = useState<Cookie[]>([])

  // useEffect(() => {
  //   const url = "https://bookmarqly.vercel.app/"

  //   chrome.cookies.getAll({ url }, (cookies) => {
  //     setCookies(cookies)
  //   })
  // }, [])
  const handleClick = () => {
    toast("Here is your toast.")
  }

  return (
    <div>
      <Toaster />
      <div className=" max-w-lg overflow-hidden bg-black text-white flex items-center justify-center ">
        Welcome to Bookmarqly
        {/* <h1>Cookies for bookmarqly.vercel.app</h1>
      <ul>
        {cookies.map((cookie, index) => (
          <li key={index}>
            <strong className=" ">{cookie.name}</strong>: {cookie.value}
            <Button variant="destructive">Click me</Button>
          </li>
        ))}
      </ul> */}
        <Button variant="destructive" onClick={handleClick}>
          Click me
        </Button>
      </div>
    </div>
  )
}

export default App

// const handleClick = async () => {
//   let [tab] = await chrome.tabs.query({ active: true })
//   chrome.scripting.executeScript({`
//     target: { tabId: tab.id! },
//     func: () => {
//       document.body.style.backgroundColor = "red"
//     },
//   })
// }
