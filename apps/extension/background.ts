chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCookie") {
    chrome.cookies.get(
      { url: "https://bookmarqly.vercel.app", name: "accessToken" },
      (cookie) => {
        sendResponse({ cookie: cookie })
      }
    )
    return true // Keep the message channel open
  }

  if (request.action === "getActiveUrl") {
    // Get the active tab and extract its URL
    ;(async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true })
        if (!tab) {
          throw new Error("No active tab found")
        }

        const url = tab.url
        sendResponse({ url })
      } catch (error) {
        console.error("Error getting active tab:", error)
        sendResponse({ error: "Failed to retrieve active tab URL" })
      }
    })()
    return true // Keep the message channel open
  }
})
