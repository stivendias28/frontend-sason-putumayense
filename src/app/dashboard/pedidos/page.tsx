"use client"
import ShowPedidos from '@/components/dashboard/pedidos/showPedidos';
import ModalNewPedido from '@/components/modals/modalNewPedido';
import { useModal } from '@/context/modalContext';
import React, { useEffect } from 'react'
import { IoIosAddCircle } from 'react-icons/io';

export default function Page() {
    const { openFormModal, setOpenFormModal } = useModal();

    useEffect(() => {
        setOpenFormModal(false);
    }, [])
    

    return (
        <>
            <h1 className=' border-b pb-2 flex justify-between mb-3'>
                <span className='pl-2 text-3xl font-bold'>Pedidos</span>
                <button
                    onClick={() => setOpenFormModal(true)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center'
                >
                    <IoIosAddCircle className='text-xl' />
                    <span className='pl-2'>Nuevo</span>
                </button>
            </h1>

            <div className='h-[86%] max-h-[86%] relative '>
                <ShowPedidos />
            </div>

            {openFormModal ? 
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
                <ModalNewPedido />
            </div> : null}
        </>
    )
}
