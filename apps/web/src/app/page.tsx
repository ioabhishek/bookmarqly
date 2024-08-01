// "use client"
// import React from "react"
// import { signIn, signOut, useSession } from "next-auth/react"

// const page = () => {
//   const { data: session } = useSession()
//   console.log(session)

//   return (
//     <div>
//       <div>
//         {session?.user ? (
//           <button onClick={() => signOut()}>Google Logout</button>
//         ) : (
//           <button onClick={() => signIn("google")}>Google Login</button>
//         )}
//       </div>
//     </div>
//   )
// }

// export default page

// "use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@repo/ui/components/button"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"

export const runtime = "edge"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <section className=" w-full max-w-screen-2xl md:px-8 px-0 mb-4">
        <div className="bg-gradient-to-t to-background from-zinc-800/30  py-[150px] rounded-b-3xl">
          <div className=" flex items-center gap-1 mx-auto w-fit text-xs px-4 py-1 border rounded-full cursor-pointer text-muted-foreground">
            Apply for Beta Tester
            <ArrowRight className=" w-3 h-3" />
          </div>
          <h2 className=" text-center text-6xl font-semibold leading-tight mb-4">
            {/* Built for everyone, <br /> */}
            Never miss a Link, <br />
            manage your bookmarks like a pro🧑‍💻
            {/* Never miss a Link */}
          </h2>
          <p className=" text-center max-w-[50%] m-auto mb-8">
            A Bookmark Manager that does it all 😎 - we help you curate and
            share links and browser tabs + discover and search across 6918+
            public collections, just like pinterest.
          </p>
          <Button className=" flex items-center gap-2 font-semibold m-auto">
            {/* <Chrome className="w-5 h-5" /> */}
            Extension Coming Soon
          </Button>
        </div>
      </section>

      <div>
        <section className=" w-full max-w-screen-2xl md:px-8 px-0 mb-4 xl:sticky xl:top-20">
          <div className=" grid grid-cols-2 border p-10 rounded-3xl min-h-[550px] content-center shadow-sm bg-background">
            <div className=" py-10">
              <h2 className=" text-4xl font-semibold text-center mb-4">
                Explore Bookmarks
              </h2>
              <p className=" w-[80%] text-center mx-auto mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                labore quasi est laboriosam consectetur ab dolore. Adipisci
                repudiandae debitis pariatur.
              </p>
              <Button size="sm" variant="outline" className=" mx-auto block">
                Start Exploring
              </Button>
            </div>
            <div className=" flex items-center justify-center">
              <Image
                src="/explore.svg"
                width="200"
                height="200"
                alt=""
                className=" w-[40%] h-auto"
              />
            </div>
          </div>
        </section>
        <section className=" w-full max-w-screen-2xl md:px-8 px-0 mb-4 xl:sticky xl:top-20">
          <div className=" grid grid-cols-2 border p-10 rounded-3xl min-h-[550px] content-center shadow-sm bg-background">
            <div className=" py-10">
              <h2 className=" text-4xl font-semibold text-center mb-4">
                Save Bookmarks
              </h2>
              <p className=" w-[80%] text-center mx-auto mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                labore quasi est laboriosam consectetur ab dolore. Adipisci
                repudiandae debitis pariatur.
              </p>
              <Button size="sm" variant="outline" className=" mx-auto block">
                Start Saving
              </Button>
            </div>
            <div className=" flex items-center justify-center">
              <Image
                src="/save_bookmarks.svg"
                width="200"
                height="200"
                alt=""
                className=" w-[40%] h-auto"
              />
            </div>
          </div>
        </section>
        <section className=" w-full max-w-screen-2xl md:px-8 px-0 mb-4 xl:sticky xl:top-20">
          <div className=" grid grid-cols-2 border p-10 rounded-3xl min-h-[550px] content-center shadow-sm bg-background">
            <div className=" py-10">
              <h2 className=" text-4xl font-semibold text-center mb-4">
                Create Bookmarks
              </h2>
              <p className=" w-[80%] text-center mx-auto mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                labore quasi est laboriosam consectetur ab dolore. Adipisci
                repudiandae debitis pariatur.
              </p>
              <Button size="sm" variant="outline" className=" mx-auto block">
                Start Creating
              </Button>
            </div>
            <div className=" flex items-center justify-center">
              <Image
                src="/create_bookmarks.svg"
                width="200"
                height="200"
                alt=""
                className=" w-[40%] h-auto"
              />
            </div>
          </div>
        </section>
        <section className=" w-full max-w-screen-2xl md:px-8 px-0 mb-4 xl:sticky xl:top-20">
          <div className="flex items-center border p-10 rounded-3xl min-h-[550px] justify-center shadow-sm bg-background">
            <div className=" py-10">
              <h2 className=" text-5xl font-semibold text-center mb-4">
                Simplify Bookmarking 🔖 with <br /> Bookmarqly’s Magic ⚡
              </h2>
              <Button size="sm" className=" mx-auto block">
                Join 99,999+ users ⚡
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
