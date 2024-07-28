"use client"
import { FC, ReactNode } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-provider"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface LayoutProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers

{
  /* <ReactQueryDevtools initialIsOpen={false} /> */
}
