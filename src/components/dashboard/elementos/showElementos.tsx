"use client"
import { Input } from '@/components/auth'
import Loading from '@/components/loading'
import { useModal } from '@/context/modalContext'
import { deleteElementosMenuController, getAllElementosMenuController } from '@/controllers/elementosController'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

export default function ShowElementos() {
    const { data: session, status } = useSession();
    const { openFormModal } = useModal();
    const [elementos, setElementos] = useState<any[]>([])
    const [elementos_Loading, setElementos_Loading] = useState(false)
    const [search, setSearch] = useState<string>("")

    const getElementos = async () => {
        setElementos(await getAllElementosMenuController())
    }

    const deleteElemento = async (id: number) => {
        const response =await deleteElementosMenuController(id, session?.accessToken as string)
        if(response.code == "OK"){
            getElementos()
        }else{
            alert(response.message)
        }
    }

    useEffect(() => {
        try{
            getElementos()
        }catch(err){
            console.log(err)
        }finally{
            setElementos_Loading(false)
        }
    }, [])

    useEffect(() => {
        getElementos()
    }, [openFormModal])
    

    if(elementos_Loading || status === "loading") return <div className='flex items-center justify-center'><Loading /></div>
    return <div className='w-full h-full flex flex-col relative '>
        <div className='w-full lg:w-[50%] mx-auto mb-3 sticky top-0 z-10'>
            <Input
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search..." />
        </div>

        <div className='h-full max-h-96 overflow-y-auto px-2'>
            {elementos.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())).length === 0 && search !== "" ?
                <p className='text-center italic'>No se ha encontrado el elemento '{search}'</p> : elementos.length === 0 ? <p className='text-center italic'>No se han registrado elementos</p> : null}
            
            
            {elementos.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())).map((elemento) => (
                <div key={elemento.id} className='p-2 border-y flex justify-between px-2 items-center'>
                <div className='flex items-center'>
                <img src={`http://localhost:8080/files/${elemento.photoElemento}`} alt="" className='w-10 h-10 rounded-full' />
                    <span className='ml-3 flex flex-col'>
                        <div className='font-bold mb-0.5 flex items-center'>
                            <span>{elemento.name}</span>
                            <span className='ml-5 text-sm'>${elemento.price}</span>
                        </div>
                        <div>{elemento.description}</div>
                    </span>
                </div>
                <div className='flex justify-center'>
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => {
                            if(confirm('¿Desea eliminar este elemento?')){
                                deleteElemento(elemento.id)
                            }
                        }}
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            </div>
            ))}
        </div>

    </div>
}
