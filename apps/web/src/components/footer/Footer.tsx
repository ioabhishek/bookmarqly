"use client"
import Link from "next/link"
import { FC } from "react"
import { Icons } from "../asset/Icons"
import { Mail, Moon, Sun, Twitter, Youtube } from "lucide-react"
import { useTheme } from "next-themes"

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const { setTheme } = useTheme()
  return (
    <footer className="w-full">
      <div className=" max-w-screen-2xl m-auto md:px-8 md:py-10 px-0 flex flex-col items-center">
        <Link href="/" className=" flex items-center gap-4">
          <Icons.logo className="w-6 h-6" />
          <span className=" text-xl font-semibold">Bookmarqly</span>
        </Link>
        <p className="text-sm font-normal opacity-75 mt-4 mb-2 text-center">
          When you find something you like on the internet, <br /> save it with
          bookmarqly before you forget
        </p>
        <span className="text-xs text-muted-foreground">
          Made with ❤️ in India
        </span>
        <div className=" flex items-center gap-6 my-4">
          <Sun
            className=" w-5 h-5 cursor-pointer"
            onClick={() => setTheme("light")}
          />
          <Moon
            className=" w-5 h-5 cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        </div>

        <div className=" flex items-center gap-4 ">
          <Link href="" className=" text-sm font-normal opacity-75">
            About Us
          </Link>
          <Link href="" className=" text-sm font-normal opacity-75">
            Contact Us
          </Link>
          <Link href="" className=" text-sm font-normal opacity-75">
            Privacy Policy
          </Link>
          <Link href="" className=" text-sm font-normal opacity-75">
            Terms of Service
          </Link>
        </div>
      </div>
      <div className=" border-t">
        <div className="  max-w-screen-2xl m-auto md:px-8 md:py-4 px-0 flex items-center justify-between">
          <span className=" text-sm font-normal opacity-70">
            Copyright © 2023 bookmarqly.com
          </span>
          <div className=" flex items-center gap-4">
            <Link href="">
              <Mail className=" w-5 h-5 opacity-75" />
            </Link>
            <Link href="">
              <Twitter className=" w-5 h-5 opacity-75" />
            </Link>
            <Link href="">
              <Youtube className=" w-5 h-5 opacity-75" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
