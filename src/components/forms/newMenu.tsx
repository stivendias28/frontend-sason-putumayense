"use client"
import { useEffect, useState } from 'react'
import { Errors, File, Input, Label, Selector } from "@/components/auth"
import { useForm } from "react-hook-form";
import { IoFastFood } from "react-icons/io5";
import { newMenuElemento } from '@/interfaces/newElementoMenu';
import { GetAllElementosController } from '@/controllers/getElementosController';
import { MdDeleteForever } from "react-icons/md";
import { saveMenusController } from '@/controllers/menusController';
import { useSession } from 'next-auth/react';
import { useModal } from '@/context/modalContext';
import Loading from '../loading';

export default function NewMenu() {
    const { setOpenFormModal } = useModal()
    const { data: session, status } = useSession();
    

    const [selectedImage, setSelectedImage] = useState<String | null>(null);
    const [dataMenuElemento, setDataElementoMenu] = useState<newMenuElemento[]>([]);
    const [getElementos, setGetElementos] = useState<any[]>([]);
    const [errorsForm, setErrorsForm] = useState<{
        menuElemento: any
    } | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue, unregister } = useForm();

    const getMenuElementos = async () => {
        setGetElementos(await GetAllElementosController());
    }

    useEffect(() => {
        getMenuElementos();
    }, [])

    const buttonAddMenuElemento = () => {
        setDataElementoMenu([...dataMenuElemento, {
            menuElementoId: 0,
        }]);
    }

    const removeMenuElemento = (index: number) => {
        unregister(`menuElementoId-${index}`);
        const newMenuElementos = [...dataMenuElemento];
        newMenuElementos.splice(index, 1);
        setDataElementoMenu(newMenuElementos);

        newMenuElementos.forEach((_, newIndex) => {
            unregister(`menuElementoId-${newIndex}`);
            register(`menuElementoId-${newIndex}`, {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                }
            });
        });
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setValue("photo", [file]);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        if (dataMenuElemento.length !== 0) {
            const valoresMenuElementoId = new Set();
            let errores = false;

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key.startsWith('menuElementoId-')) {
                        const valor = data[key];
                        if (valoresMenuElementoId.has(valor)) {
                            errores = true;
                            setErrorsForm({
                                menuElemento: `Error: El valor ${getElementos.find((elemento) => elemento.id === valor)?.name} está duplicado.`
                            });
                            break;
                        } else {
                            valoresMenuElementoId.add(valor);
                        }
                    }
                }
            }

            if (!errores) {
                setErrorsForm(null);
                await saveMenusController(data, session?.accessToken!);
                setOpenFormModal(false)
            }
        } else {
            setErrorsForm({
                menuElemento: "Se requiere minimo un elemento"
            });
        }
    })

    if(status === "loading") return <Loading />

    return (
        <div className='w-full h-full max-h-[60vh] overflow-x-hidden overflow-y-auto'>
            <form 
                onSubmit={onSubmit} 
                method='POST'
                encType='multipart/form-data'
            >
                <div className=" grid grid-cols-1 gap-x-3 sm:gap-y-3 gap-y-1 sm:grid-cols-6 px-2">
                    <div className="col-span-full">
                        <div className="mt-2 flex items-center flex-col md:flex-row justify-center gap-x-3">
                            {selectedImage ? (
                                <img src={selectedImage.toString()} id="photo" alt="Selected" className="h-20 w-20 rounded-full mb-3" />
                            ) : (
                                <IoFastFood className="h-16 w-auto mb-3" aria-hidden="true" />
                            )}
                            <File
                                id="photo"
                                {...register("photo", {
                                    required: {
                                        value: true,
                                        message: "Se requiere una imagen"
                                    }
                                })}
                                onChange={handleImageChange}
                            />
                        </div>
                        <span className="text-xs text-gray-500 flex justify-center items-center">JPG, PNG, GIF</span>
                        <span>
                            {errors.photo && errors.photo.type === "required" && (
                                <Errors>{errors.photo.message}</Errors>
                            )}
                        </span>
                    </div>

                    <div className='sm:col-span-3'>
                        <Label htmlFor='name'>Nombre</Label>
                        <div className='mt-1'>
                            <Input 
                                type='text' 
                                id='name'
                                placeholder='Nombre del plato'
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    }
                                })}
                                autoComplete='off' 
                            />
                        </div>
                        <span>
                            {errors.name && errors.name.type === "required" && (
                                <Errors>{errors.name.message}</Errors>
                            )}
                        </span>
                    </div>

                    <div className='sm:col-span-3'>
                        <Label htmlFor='description'>Descripción</Label>
                        <div className='mt-1'>
                            <Input 
                                type='text' 
                                id='description'
                                placeholder='Descripción del plato'
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    }
                                })}
                                autoComplete='off' 
                            />
                        </div>
                        <span>
                            {errors.description && errors.description.type === "required" && (
                                <Errors>{errors.description.message}</Errors>
                            )}
                        </span>
                    </div>

                    <div className='col-span-full'>
                        <button 
                            type='button'
                            className='w-full mt-5 px-4 py-2 text-sm font-medium bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                            onClick={buttonAddMenuElemento}
                        >
                            Añadir elemento
                        </button>
                    </div>

                    {dataMenuElemento.map((menuElemento, index) => (
                        <div key={index} className='col-span-full'>
                            <div className='mt-1 flex'>
                                <Selector
                                    id={`menuElementoId-${index}`}
                                    placeholder='Seleccione un elemento'
                                    data={getElementos.map(({id, name}) => ({value: id, label: name}))}
                                    {...register(`menuElementoId-${index}`, {
                                        required: {
                                            value: true,
                                            message: "Este campo es requerido"
                                        }
                                    })}
                                    setValue={setValue}
                                    isSearch={true}
                                />
                                <button 
                                    className='ml-3 text-xl px-2 bg-red-400 p-1 rounded-md hover:bg-red-500'
                                    onClick={() => removeMenuElemento(index)}
                                    type="button"
                                >
                                    <MdDeleteForever />
                                </button>
                            </div>
                            <span>
                                {errors[`menuElementoId-${index}`] && errors[`menuElementoId-${index}`]?.type === "required" && (
                                    <Errors>{errors[`menuElementoId-${index}`]?.message}</Errors>
                                )}
                            </span>
                        </div>
                    ))}

                    {errorsForm && (
                        <div className='col-span-full'>
                            <Errors>{errorsForm.menuElemento}</Errors>
                        </div>
                    )}

                    <div>
                        <button
                            type='submit'
                            className='w-full mt-5 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
