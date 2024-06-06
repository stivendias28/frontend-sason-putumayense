"use client"
import { Input } from '@/components/auth'
import Loading from '@/components/loading'
import { useModal } from '@/context/modalContext'
import { getPedidosController } from '@/controllers/pedidosController'
import { useEffect, useState } from 'react'

export default function ShowPedidos() {
    const { openFormModal } = useModal()

    const [ShowPedidos, setShowPedidos] = useState<any[]>([])
    const [showPedidos_loading, setShowPedidos_loading] = useState(true)
    const [search, setSearch] = useState<string>("")
    

    const getPedidos = async () => {
        setShowPedidos(await getPedidosController())   
    }

    useEffect(() => {
        try{
            getPedidos()
        }catch(err){
            console.log(err)
        }finally{
            setShowPedidos_loading(false)
        }
    }, [])

    useEffect(() => {
        getPedidos()
    }, [openFormModal])
    
    if(showPedidos_loading) return <div className='flex items-center justify-center'><Loading /></div>

    return <div className='w-full h-full flex flex-col relative '>
    <div className='w-full lg:w-[50%] mx-auto mb-3 sticky top-0 z-10'>
        <Input
            onChange={(e) => setSearch(e.target.value)} 
            type="text" 
            placeholder="Search..." />
    </div>

    <div className='px-8 mb-2'>
            <div className='px-2 flex justify-between items-center font-bold'>
                <div className='flex items-center'>
                    <span className='ml-3'>
                        Usuario
                    </span>
                </div>
                <div className='flex '>
                    Total & Estado
                </div>
            </div>
    </div>

    <div className='h-full max-h-96 overflow-y-auto px-2'>
        {ShowPedidos.filter((menu) => menu.user.name.toLowerCase().includes(search.toLowerCase())).length === 0 && search !== "" ? 
            <p className='text-center italic'>No se ha encontrado pedidos del usuario '{search}'</p> : (ShowPedidos.length === 0 ? <p className='text-center italic'>No se ha registrado ningun pedido</p> : "")}
        
        
        {ShowPedidos.filter((menu) => menu.user.name.toLowerCase().includes(search.toLowerCase())).map((pedido: any) => (
            <div key={pedido.id} className='p-2 border-y flex justify-between px-2 items-center'>
                <div className='flex items-center'>
                    <img src={`http://localhost:8080/files/${pedido.user.photo}`} alt="" className='w-14 h-14 rounded-full' />
                    <span className='ml-3 flex flex-col'>
                        <div className='font-bold mb-0.5 flex items-center'>
                            <span>{pedido.user.name}</span>
                            <span className='ml-3'>{pedido.user.identificationType.abrevIdentificationType}</span> 
                            <span>{pedido.user.identificationNumber}</span>    
                        </div>
                        <div className='text-sm italic'>Celular: {pedido.user.phone}</div>
                        <div className='text-sm italic'>Email: {pedido.user.email}</div>
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <span>${pedido.total}</span>
                    <span>{pedido.estadoPedido.name}</span>
                </div>
            </div>
        ))}
    </div>

</div>
}
