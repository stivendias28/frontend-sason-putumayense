"use client"
import ShowMenus from '@/components/dashboard/menus/showMenus';
import React, { useEffect } from 'react'
import { useModal } from '@/context/modalContext';
import { IoIosAddCircle } from "react-icons/io";
import ModalNewMenu from '@/components/modals/modalNewMenu';

export default function MenusPage() {
    const { openFormModal, setOpenFormModal } = useModal();

    useEffect(() => {
        setOpenFormModal(false);
    }, []);

    return <>
        <h1 className=' border-b pb-2 flex justify-between mb-3'>
            <span className='pl-2 text-3xl font-bold'>Menus</span>
            <button
                onClick={() => setOpenFormModal(true)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center'
            >
                <IoIosAddCircle className='text-xl' />
                <span className='pl-2'>Nuevo</span>
            </button>
        </h1>
        
        <div className='h-[86%] max-h-[86%] relative '>
            <ShowMenus />
        </div>

        {openFormModal ?
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
                <ModalNewMenu /> 
            </div>
        : null}
    </>
}
