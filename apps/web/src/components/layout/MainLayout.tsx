import Sidebar from "@/components/sidebar/Sidebar"
import AppHeader from "@/components/header/AppHeader"
import { auth } from "@/lib/auth"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const session = await auth()
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className={`pl-[280px] w-full`}>
        <AppHeader />
        {children}
      </div>
    </div>
  )
}
