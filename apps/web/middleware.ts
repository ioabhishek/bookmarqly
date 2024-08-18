import { NextRequest, NextResponse } from "next/server"

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Origin": "*", // Allow any origin
}

export function middleware(request: NextRequest) {
  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS"

  if (isPreflight) {
    return NextResponse.json({}, { headers: corsOptions })
  }

  // Handle simple requests
  const response = NextResponse.next()

  // Set CORS headers for all responses
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: "/api/:path*",
}
