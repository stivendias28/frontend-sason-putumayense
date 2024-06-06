"use client"
import { useModal } from '@/context/modalContext'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { VscLoading } from 'react-icons/vsc'
import NewMenu from '../forms/newMenu'

export default function ModalNewMenu() {
    const [modalNewMenu_loading, setModalNewMenu_loading] = useState(true)

    const { setOpenFormModal } = useModal()

    useEffect(() => {
        setModalNewMenu_loading(false)
    }, [])


    return <div className='w-full md:w-[70%] lg:w-[50%] max-h-[80vh] bg-white dark:bg-gray-800 p-5 rounded-lg relative'>
        <div className='w-full flex items-center justify-between px-1 py-2 border-b mb-2'>
            <span className='text-lg font-bold flex items-center'>
                Nuevo Menu
            </span>
            <button onClick={() => setOpenFormModal(false)}>
                <IoMdClose className='text-2xl mr-2 font-bold' />
            </button>
        </div>
        <div className='pt-5 pb-2'>
            {modalNewMenu_loading ?
                <span className='w-full h-full flex items-center justify-center'>
                    <VscLoading className='text-3xl animate-spin ' />
                </span> :
                <div>
                    <NewMenu />
                </div>}   
        </div>
    </div>
}
