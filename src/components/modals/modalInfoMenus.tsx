"use client"
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useModal } from '@/context/modalContext';
import { GetAllMenuElementosController } from '@/controllers/getAllMenuElementosController';
import { VscLoading } from "react-icons/vsc";

interface ModalProps {
    title: string;
    menuId: number;
    img: string;
}

export default function Modal({ title, menuId, img }: ModalProps) {
    const { setOpenModal } = useModal();
    const [showModalLoading, setShowModalLoading] = useState(true);
    const [elementosMenu, setElementosMenu] = useState<any[]>([]);

    const getMenuElementos = async () => {
        const elementos = await GetAllMenuElementosController(menuId);
        setElementosMenu(elementos);
        setShowModalLoading(false);
    }

    function sumPrices(items: any[]) {
        return items.reduce((total, item) => total + item.elementosMenu.price, 0);
    }

    useEffect(() => {
        getMenuElementos();
    }, [menuId]);

    return (
        <div className='w-full md:w-[70%] lg:w-[50%] max-h-[50vh] bg-white dark:bg-gray-800 p-5 rounded-lg relative'>
            <div className='w-full flex items-center justify-between px-1 py-2 border-b mb-2'>
                <span className='text-lg font-bold flex items-center'>
                    <img src={`http://localhost:8080/files/${img}`} alt="" className='w-10 h-10 rounded-full' />
                    <span className='ml-3'>
                        {title}
                    </span>
                </span>
                <button onClick={() => setOpenModal(false)}>
                    <IoMdClose className='text-2xl mr-2 font-bold' />
                </button>
            </div>
            {showModalLoading ? 
                <span className='w-full h-full flex items-center justify-center'>
                    <VscLoading className='text-3xl animate-spin ' />
                </span> : 
                <div className='w-full h-full max-h-[35vh] overflow-x-hidden overflow-y-auto '>
                    {elementosMenu.map(({elementosMenu}: any) => (
                        <div key={elementosMenu.id} className='p-2 border-y flex justify-between px-2 items-center'>
                            <div className='flex items-center'>
                                <img src={`http://localhost:8080/files/${elementosMenu.photoElemento}`} alt="" className='w-10 h-10 rounded-full' />
                                <span className='ml-3'>
                                    {elementosMenu.name}
                                </span>
                            </div>
                            <div className='pr-3'>
                                <span>${elementosMenu.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <div className='w-full pt-2 border-t flex justify-between px-3'>
                <span>Total:</span>
                <span>{(showModalLoading ? 0 : "$"+sumPrices(elementosMenu))}</span>
            </div>
        </div>
    );
}
