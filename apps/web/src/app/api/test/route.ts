import { NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"
import axios from "axios"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    return NextResponse.json(html)

    // Load the HTML into cheerio
    const $ = cheerio.load(html)

    // Extract meta details
    const metaDetails = {
      title: $("head > title").text(),
      description: $('meta[name="description"]').attr("content"),
      keywords: $('meta[name="keywords"]').attr("content"),
      ogTitle: $('meta[property="og:title"]').attr("content"),
      ogDescription: $('meta[property="og:description"]').attr("content"),
      ogImage: $('meta[property="og:image"]').attr("content"),
    }

    // Send the extracted details as JSON
    return NextResponse.json({ metaDetails })
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" })
  }
}
