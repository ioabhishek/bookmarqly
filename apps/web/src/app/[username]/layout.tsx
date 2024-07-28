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
        <Sidebar />
        <div className="pl-[280px] w-full h-[100vh] ">
          <AppHeader />
          <div className="h-full mt-16">{children}</div>
        </div>
      </div>
    </main>
  )
}
