"use client"
import { Input } from '@/components/auth'
import { GetAllMenusController, deleteMenu } from '@/controllers/getAllMenusController'
import { Menus } from '@/interfaces/database'
import React, { useEffect, useState } from 'react'
import { BiSolidDetail } from "react-icons/bi";
import { useModal } from '@/context/modalContext'
import Modal from '@/components/modals/modalInfoMenus'
import { MdDeleteForever } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import Precio from './precio'

export default function ShowMenus() {
    const [showMenus_loading , setShowMenus_loading] = useState(true)
    const [menus, setMenus] = useState([])
    const [search, setSearch] = useState<string>("")
    const [menuId, setMenuId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [img, setImg] = useState<string>("")
    const { data: session, status } = useSession()

    const { openModal, setOpenModal, openFormModal } = useModal()

    const getMenus = async () => {
        setMenus(await GetAllMenusController(search))
    }

    const deleteMenus = async (menuId: number) => {
        const response =await deleteMenu(menuId, session?.accessToken as string)
        if(response.code == "OK"){
            getMenus()
        }else{
            alert(response.message)
        }
    }

    

    useEffect(() => {
        getMenus()
        setShowMenus_loading(false)
    }, [])

    useEffect(() => {
        getMenus()
    }, [search])

    useEffect(() => {
        getMenus()
    }, [openFormModal])

    if(showMenus_loading || status === "loading") return <p>Cargando...</p>

    return <div className='w-full h-full flex flex-col relative '>
        <div className='w-full lg:w-[50%] mx-auto mb-3 sticky top-0 z-10'>
            <Input 
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search..." />
        </div>

        <div className='h-full max-h-96 overflow-y-auto px-2'>
            {(search != "" && menus.length === 0) ? 
                <p className='text-center italic'>No se han encontrado resultados para "{search}"</p> 
                : (menus.length === 0) ? <p className='text-center italic'>No se ha registrado ningun menu</p> : null}
            
            {menus.map((menu: Menus) => (
                <div key={menu.id} className='p-2 border-y flex justify-between px-2 items-center'>
                    <div className='flex items-center'>
                        <img src={`http://localhost:8080/files/${menu.photo_menu}`} alt="" className='w-10 h-10 rounded-full' />
                        <span className='ml-3 flex flex-col'>
                            <div className='font-bold mb-0.5 flex items-center'>
                                <span>{menu.name}</span>
                                <Precio menuId={menu.id} />
                            </div>
                        <div>{menu.description}</div>
                    </span>
                    </div>
                    <div className='flex '>
                        <button 
                            className='flex items-center bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-gray-800 dark:text-slate-50 rounded p-2'
                            onClick={() => {
                                setMenuId(menu.id)
                                setTitle(menu.name)
                                setImg(menu.photo_menu.toString())
                                setOpenModal(true)
                            }}>
                            <BiSolidDetail />
                            <span className='ml-2'>ver más</span>
                        </button>
                        <button 
                            className='ml-3 bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
                            onClick={() => {
                                if(confirm("¿Desea eliminar el menu?")) {
                                    deleteMenus(menu.id)
                                }
                            }}
                        >
                            <MdDeleteForever />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {openModal ? 
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
                <Modal 
                    title={title}
                    menuId={menuId}
                    img={img}
                /> 
            </div>
                : null}

    </div>
}
