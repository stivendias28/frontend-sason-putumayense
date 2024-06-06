"use client"
import { getElementosMenusWithMenuId } from '@/controllers/elementosController';
import { calculateTotal } from '@/controllers/pedidosController';
import { useEffect, useState } from 'react'

export default function Precio({menuId}: {menuId: number}) {
    const [price, setPrice] = useState(0)
    
    const getPriceMenu = async (menuId: number) => {
        const response = await getElementosMenusWithMenuId(menuId)
        if(response.length > 0) {
            let price = 0
            for (const elemento of response) {
                price += elemento.elementosMenu.price
            }
            setPrice(price)
        }
    }

    useEffect(() => {
        getPriceMenu(menuId)
    }, [])


    return <span className='ml-5 text-sm'>${price}</span>
}
