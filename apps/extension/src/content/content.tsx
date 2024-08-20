import "../../public/index.css"
import ContentApp from "./ContentApp.tsx"
import { createRoot } from "react-dom/client"
import Unauthorized from "./Unauthorized.tsx"
import axios from "axios"

let accessToken: string
const BACKEND_URL = "https://bookmarqly.vercel.app/api/"
const appendTailwindStyleData = (shadowRoot: ShadowRoot) => {
  const styleSheet = document.createElement("style")

  const path = chrome.runtime.getURL("/public/output.css")

  fetch(path)
    .then((response) => response.text())
    .then((css) => {
      styleSheet.textContent = `:host { all: initial; } ${css}`
      shadowRoot.appendChild(styleSheet)
    })
}

function getCookie(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookie" }, (response) => {
      if (response && response.cookie) {
        resolve(response.cookie.value)
      } else {
        reject(new Error("Cookie not found"))
      }
    })
  })
}

const hostDiv = document.createElement("div")
hostDiv.id = "bookmarqly-extension-host"
document.body.appendChild(hostDiv)

const shadowRoot = hostDiv.attachShadow({ mode: "open" })

const rootDiv = document.createElement("div")
rootDiv.id = "bookmarqly-extension-root"
shadowRoot.appendChild(rootDiv)

appendTailwindStyleData(shadowRoot)

const root = createRoot(rootDiv)

getCookie()
  .then((token) => {
    accessToken = token
    root.render(<ContentApp token={token} />)
  })
  .catch((error) => {
    console.log(error)
    root.render(<Unauthorized />)
  })

// Reddit save to Bookmarqly integration
if (window.location.host === "www.reddit.com") {
  const articles = document.getElementsByTagName("article")

  async function addToBookmarqly(data: string) {
    if (!accessToken) {
      alert("You must be logged in to create a bookmark")
      return
    }

    const payload = {
      url: `https://www.reddit.com${data}`,
    }

    const response = await axios.post(`${BACKEND_URL}bookmark`, payload, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    })

    const customDiv = document.createElement("div")
    customDiv.id = "bookmarqly-success-popup"
    customDiv.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      color: white;
      z-index: 9999999;
      background: black;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: semibold;
      border: 1px solid #ffffff30;
    `
    customDiv.textContent = "Added to Bookmarqly 🎉"

    if (response?.data?.success === true) {
      document.body.appendChild(customDiv)
      setTimeout(() => {
        document.body.removeChild(customDiv)
      }, 3000)
    }

    console.log(response?.data?.success)
  }

  if (articles && articles.length > 0) {
    for (const article of articles) {
      const aTag = article.querySelector("a")

      if (aTag) {
        const hrefValue = aTag.getAttribute("href")
        article.style.position = "relative"

        const customDiv = document.createElement("div")
        customDiv.id = "custom-div"
        customDiv.style.cssText = `
          position: absolute;
          right: 16px;
          bottom: 8px;
          background: #00000010;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          padding: 0 12px 0;
          border-radius: 100px;
          border: 1px solid #8d8d8d;
          cursor: pointer;
        `
        customDiv.textContent = "Add to Bookmarqly"

        if (hrefValue) {
          customDiv.setAttribute("data-href", hrefValue)
          customDiv.addEventListener("click", () => {
            addToBookmarqly(hrefValue)
          })
        }

        article.appendChild(customDiv)
      }
    }
  } else {
    console.warn("No 'article' elements found initially.")
  }

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element && node.tagName === "ARTICLE") {
            const article = node as HTMLElement
            if (!article.querySelector("#custom-div")) {
              const aTag = article.querySelector("a")

              if (aTag) {
                const hrefValue = aTag.getAttribute("href")
                article.style.position = "relative"

                const customDiv = document.createElement("div")
                customDiv.id = "custom-div"
                customDiv.style.cssText = `
                  position: absolute;
                  right: 16px;
                  bottom: 8px;
                  background: #00000010;
                  height: 32px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  padding: 0 12px 0;
                  border-radius: 100px;
                  border: 1px solid #8d8d8d;
                  cursor: pointer;
                `
                customDiv.textContent = "Add to Bookmarqly"

                if (hrefValue) {
                  customDiv.setAttribute("data-href", hrefValue)
                  customDiv.addEventListener("click", () => {
                    addToBookmarqly(hrefValue)
                  })
                }

                article.appendChild(customDiv)
              }
            }
          }
        }
      }
    }
  })

  const targetNode = document.body
  const config = { childList: true, subtree: true }
  observer.observe(targetNode, config)
}

// Linkedin save to Bookmarqly integration
if (window.location.host === "www.linkedin.com") {
  async function addToBookmarqly(data: string) {
    if (!accessToken) {
      alert("You must be logged in to create a bookmark")
      return
    }

    const payload = {
      url: `https://www.linkedin.com/feed/update/${data}`,
    }

    const response = await axios.post(`${BACKEND_URL}bookmark`, payload, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    })

    const customDiv = document.createElement("div")
    customDiv.id = "bookmarqly-success-popup"
    customDiv.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      color: white;
      z-index: 9999999;
      background: black;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: semibold;
      border: 1px solid #ffffff30;
    `
    customDiv.textContent = "Added to Bookmarqly 🎉"

    if (response?.data?.success === true) {
      document.body.appendChild(customDiv)
      setTimeout(() => {
        document.body.removeChild(customDiv)
      }, 3000)
    }

    console.log(response?.data?.success)
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        const target = mutation.target as HTMLElement
        for (const childDiv of target.children) {
          const dataIdDiv = Array.from(
            childDiv.querySelectorAll("[data-id]")
          ) as HTMLElement[]
          for (const div of dataIdDiv) {
            const dataIdValue = div.getAttribute("data-id")
            if (dataIdValue && dataIdValue.startsWith("urn:li:activity:")) {
              // Check if the custom div already exists
              if (!div.querySelector("#bookmarqly-div")) {
                // Create and append the custom div
                const customDiv = document.createElement("div")
                customDiv.id = "bookmarqly-div"
                customDiv.style.cssText = `
                position: absolute;
                right: 80px;
                top: 6px;
                background: #0a66c2;
                color: #ffffff;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                padding: 0 12px 0;
                border-radius: 100px;
                cursor: pointer;
              `
                customDiv.textContent = "Add to Bookmarqly"
                customDiv.addEventListener("click", () => {
                  addToBookmarqly(dataIdValue)
                })
                div.appendChild(customDiv)
              }
            }
          }
        }
      }
    }
  })

  // Target the element you want to observe
  const infiniteContent = document.querySelector(
    ".scaffold-finite-scroll__content"
  ) as HTMLElement

  if (infiniteContent) {
    observer.observe(infiniteContent, { childList: true, subtree: true })
  }
}

// Youtube save to Bookmarqly integration
if (window.location.host === "www.youtube.com") {
  async function addToBookmarqly(data: string) {
    if (!accessToken) {
      alert("You must be logged in to create a bookmark")
      return
    }

    const payload = {
      url: `https://youtu.be/${data}`,
    }

    const response = await axios.post(`${BACKEND_URL}bookmark`, payload, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    })

    const customDiv = document.createElement("div")
    customDiv.id = "bookmarqly-success-popup"
    customDiv.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      color: white;
      z-index: 9999999;
      background: black;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: semibold;
      border: 1px solid #ffffff30;
    `
    customDiv.textContent = "Added to Bookmarqly 🎉"

    if (response?.data?.success === true) {
      document.body.appendChild(customDiv)
      setTimeout(() => {
        document.body.removeChild(customDiv)
      }, 3000)
    }

    console.log(response?.data?.success)
  }

  const addCustomDivs = (elements: any) => {
    for (const div of elements) {
      // Check if the custom div already exists to avoid duplication
      if (!div.querySelector(".bookmarqly-div")) {
        const aTag = div.querySelector("a")

        if (aTag) {
          const hrefValue = aTag.getAttribute("href")

          if (hrefValue) {
            const customDiv = document.createElement("div")
            customDiv.className = "bookmarqly-div"
            customDiv.style.cssText = `
              position: absolute;
              left: 5px;
              top: 5px;
              background: #7518ed;
              color: #ffffff;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: 500;
              padding: 0 10px;
              border-radius: 100px;
              cursor: pointer;
              z-index: 99;
            `
            customDiv.textContent = "Add to Bookmarqly"
            customDiv.addEventListener("click", () => {
              addToBookmarqly(hrefValue.split("=")[1])
            })

            div.appendChild(customDiv)
          }
        }
      }
    }
  }

  // Initial addition of custom divs
  const initialThumbnails = document.getElementsByTagName("ytd-thumbnail")
  addCustomDivs(initialThumbnails)

  // Set up the MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        // Ensure the node is an element
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element // Cast Node to Element

          // Check if any new ytd-thumbnail elements are added within this node
          const newThumbnails = element.querySelectorAll("ytd-thumbnail")
          if (newThumbnails.length > 0) {
            setTimeout(() => addCustomDivs(newThumbnails), 100) // Delay to ensure the element is fully constructed
          } else if (element.tagName === "YTD-THUMBNAIL") {
            setTimeout(() => addCustomDivs([element]), 100) // Handle single ytd-thumbnail elements
          }
        }
      }
    }
  })

  // Observe changes in the body or a more specific container
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}
