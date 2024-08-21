import * as cheerio from "cheerio"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  })

  const $ = cheerio.load(html)

  const metaDetails = {
    title: $("head > title").text(),
    description: $('meta[name="description"]').attr("content"),
    keywords: $('meta[name="keywords"]').attr("content"),
    ogTitle: $('meta[property="og:title"]').attr("content"),
    ogDescription: $('meta[property="og:description"]').attr("content"),
    ogImage: $('meta[property="og:image"]').attr("content"),
  }
  return NextResponse.json({ data: metaDetails })
}
