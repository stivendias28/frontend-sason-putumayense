"use client"
import { useSession } from 'next-auth/react'
import { useModal } from '@/context/modalContext'
import Loading from '../loading';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getUserController } from '@/controllers/userController';
import { Errors, Input, Label, Required, Selector } from '../auth';
import { newMenuPedido } from '@/interfaces/newMenuPedido';
import { GetAllMenusController } from '@/controllers/getAllMenusController';
import { MdDeleteForever } from 'react-icons/md';
import { savePedidosController } from '@/controllers/pedidosController';

export default function NewPedido() {
    const { setOpenFormModal } = useModal()
    const { data: session, status } = useSession();
    const { register, handleSubmit, formState: { errors }, setValue, unregister } = useForm();

    const [listUsers, setListUsers] = useState<any[]>([]);
    const [listMenus, setListMenus] = useState<any[]>([]);
    const [newPedido_loading, setNewPedido_loading] = useState(true);
    const [dataPedidosMenu, setDataPedidosMenu] = useState<newMenuPedido[]>([]);

    const getUsers = async () => {
        setListUsers(await getUserController(session?.accessToken as string));
    }

    const getMenus = async () => {
        setListMenus(await GetAllMenusController(""));
    }

    useEffect(() => {
        try{
            getUsers();
            getMenus();
        }catch(error){
            console.log(error)
        }finally{
            setNewPedido_loading(false)
        }
    }, [])

    const buttonAddPedidoMenu = () => {
        setDataPedidosMenu([...dataPedidosMenu, {
            menuId: 0, 
            quantity: 0, 
            optionPerzonalized: ""
        }])
    }

    const removePedidoMenu = (index: number) => {
        setDataPedidosMenu(dataPedidosMenu.filter((item, i) => i !== index))
    }

    const handleInputChange = (index: number, field: string, value: any) => {
        const newDataPedidosMenu = [...dataPedidosMenu];
        newDataPedidosMenu[index] = {
            ...newDataPedidosMenu[index],
            [field]: value,
        };
        setDataPedidosMenu(newDataPedidosMenu);
    }

    const onSubmit = handleSubmit(async (data) => {
        await savePedidosController(data, session?.accessToken as string, dataPedidosMenu);
        setOpenFormModal(false)
    })
    
    if(status === "loading" || newPedido_loading) return <Loading />
    return (
        <div className='w-full max-h-[60vh] overflow-x-hidden overflow-y-auto'>
            <form 
                method='POST'
                onSubmit={onSubmit}
                encType='multipart/form-data'
            >
                <div className='grid grid-cols-1 gap-x-3 sm:gap-y-3 gap-y-1 sm:grid-cols-6 px-2 min-h-[30vh]'>
                    <div className='col-span-full'>
                        <Label htmlFor="user">Usuario <Required /> </Label>
                        <div className='mt-2'>
                            <Selector
                                id="user"
                                placeholder="Select user..."
                                data={listUsers? listUsers.map((item) => ({
                                    value: item.id, label: `${item.name} ${item.lastName} (${item.identificationType.abrevIdentificationType}: ${item.identificationNumber})` 
                                })) : []}
                                {...register("user", {
                                    required: {
                                        value: true,
                                        message: "This user is required"
                                    }
                                })}
                                setValue={setValue}
                                isSearch={true}
                            />
                        </div>
                        <span>
                            {errors.user &&
                                errors.user.type === "required" && <Errors>{errors.user.message}</Errors>}
                        </span>
                    </div>

                    <div className='col-span-full'>
                        <button 
                            type='button'
                            className='w-full mt-5 px-4 py-2 text-sm font-medium bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                            onClick={buttonAddPedidoMenu}
                        >
                            Añadir elemento
                        </button>
                    </div>
                    
                    <div className="col-span-full">
                        {dataPedidosMenu.map((item, index) => (
                            <div key={index} className='grid grid-cols-1 gap-x-3 sm:gap-y-3 gap-y-1 px-2 w-full border-y py-2'>
                                <div className='col-span-full' >
                                    <Label htmlFor="menu">Menu <Required /> </Label>
                                    <div className='mt-2'>
                                        <Selector
                                            id="menu"
                                            placeholder="Select menu..."
                                            data={listMenus? listMenus.map((item) => ({
                                                value: item.id, label: item.name
                                            })) : []}
                                            {...register(`add-menu-${index}`, {
                                                required: {
                                                    value: true,
                                                    message: "This menu is required"
                                                }
                                            })}
                                            setValue={(name, value) => {
                                                handleInputChange(index, "menuId", value);
                                                setValue(name as keyof typeof item, value);
                                            }}
                                            isSearch={true}
                                        />
                                    </div>
                                    <span>
                                        {errors[`add-menu-${index}`] &&
                                            errors[`add-menu-${index}`]?.type === "required" && <Errors>{errors[`add-menu-${index}`]?.message}</Errors>}
                                    </span>
                                </div>
                                <div className='col-span-full'>
                                    <div className="mt-2">
                                        <Input
                                           id='quantity'
                                           placeholder='Cantidad'
                                           type='number'
                                           min={0}
                                           {...register(`add-quantity-${index}`, {
                                                required: {
                                                    value: true,
                                                    message: "This quantity is required"
                                                },
                                                onChange: (e) => handleInputChange(index, "quantity", parseInt(e.target.value)),
                                           })}
                                        /> 
                                    </div>
                                    <span>
                                        {errors[`add-quantity-${index}`] &&
                                            errors[`add-quantity-${index}`]?.type === "required" && <Errors>{errors[`add-quantity-${index}`]?.message}</Errors>}
                                    </span>
                                </div>
                                <div className='col-span-full'>
                                    <div className="mt-2">
                                        <Input
                                            id='optionPerzonalized'
                                            placeholder='Ingrese aqui alguna peticion para su menu'
                                            {...register(`add-optionPerzonalized-${index}`, {
                                                onChange: (e) => handleInputChange(index, "optionPerzonalized", e.target.value)
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className='col-span-full'>
                                    <button 
                                        className='w-full text-xl bg-red-400 p-1 rounded-md hover:bg-red-500 flex justify-center'
                                        onClick={() => removePedidoMenu(index)}
                                        type="button"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='col-span-full flex justify-center'>
                        <button
                            type='submit'
                            className='w-[50%] mt-5 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
