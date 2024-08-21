import * as cheerio from "cheerio"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  // const browser = await puppeteer.launch({
  //   headless: true, // You can set to false to debug
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  // })

  // const page = await browser.newPage()
  // await page.goto(url, { waitUntil: "networkidle2" })

  // // Extract OG tags using Puppeteer
  // const ogTitle = await page.$eval(
  //   'meta[property="og:title"]',
  //   (element) => element.content
  // )
  // const ogDescription = await page.$eval(
  //   'meta[property="og:description"]',
  //   (element) => element.content
  // )
  // const ogImage = await page.$eval(
  //   'meta[property="og:image"]',
  //   (element) => element.content
  // )

  // await browser.close()

  // const ogDetails = {
  //   ogTitle,
  //   ogDescription,
  //   ogImage,
  // }

  // return NextResponse.json({ data: ogDetails })
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  })

  // return NextResponse.json({ data: html })

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
