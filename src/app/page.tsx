"use client"
import ItemHome from "@/components/cards/itemHome"
import Loading from "@/components/loading"
import { GetAllMenusController } from "@/controllers/getAllMenusController"
import { useEffect, useState } from "react"

export default function Page() {
  const [menus, setMenus] = useState<any[]>([])
  const [search, setSearch] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const getMenus = async () => {
    try {
      const menusData = await GetAllMenusController(search)
      setMenus(menusData)
    } catch (error) {
      console.error("Error fetching menus:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMenus()
  }, [search])

  if (loading) return <Loading />

  return (
    <div className="mt-10 px-4 md:px-24 lg:px-32">
      {menus.length === 0 ? (
        <p className="text-2xl font-bold">
          No se registran menus {search !== "" ? `con el nombre ${search}` : ""}
        </p>
      ) : null}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {menus.map((menu) => (
          <ItemHome key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  )
}
