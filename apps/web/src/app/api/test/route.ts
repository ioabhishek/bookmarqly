import { NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"
import axios from "axios"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  try {
    const { data: html } = await axios.get(url)

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
