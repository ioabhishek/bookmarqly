import AppHeader from "@/components/header/AppHeader"
import Sidebar from "@/components/sidebar/Sidebar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="w-full">
        <AppHeader />
        <div className="">
          <Sidebar />
          <div className="pl-[280px] w-full h-[calc(100%-64px)] ">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
