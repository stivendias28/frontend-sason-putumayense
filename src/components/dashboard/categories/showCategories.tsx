"use client"
import { Input } from "@/components/auth";
import Loading from "@/components/loading";
import { useModal } from "@/context/modalContext";
import { deleteCategoriesController, getCategoriesController } from "@/controllers/categoriesController";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function ShowCategories() {
    const { data: session, status } = useSession();

    const [categories, setCategories] = useState<any[]>([]);
    const [categories_loading, setCategories_loading] = useState(true);
    const [search, setSearch] = useState("");
    const { openFormModal } = useModal();

    const getCategories = async () => {
        setCategories(await getCategoriesController())
    }

    const deleteCategories = async (categoryId: number) => {
        const response =await deleteCategoriesController(categoryId, session?.accessToken as string)
        if(response.code == "OK"){
            getCategories()
        }else{
            alert(response.message)
        }
    }

    useEffect(() => {
        getCategories()
        setCategories_loading(false)
    }, [])

    useEffect(() => {
        getCategories()
    }, [openFormModal])

    if(categories_loading || status === "loading") return <Loading />

    return <div className='w-full h-full flex flex-col overflow-y-auto relative'>
        <div className='w-full lg:w-[50%] mx-auto mb-3 sticky top-0 z-10'>
            <Input
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search..." />
        </div>

        <div className="w-full mt-2 px-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center border-b">
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase())).map((category) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={category.id}>
                            <td className="px-6 py-4 font-bold">
                                {category.name.toLocaleUpperCase()}
                            </td>
                            <td className="px-6 py-4 text-end">
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => {
                                        if(confirm("Are you sure you want to delete this category?")) {
                                            deleteCategories(category.id)
                                        }
                                    }}   
                                >
                                    <MdDeleteForever className="text-lg" />
                                </button>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </div>
}
