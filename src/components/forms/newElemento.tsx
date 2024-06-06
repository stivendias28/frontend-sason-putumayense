"use client"
import { useEffect, useState } from 'react'
import { Errors, File, Input, Label, Required, Selector } from "@/components/auth"
import { useForm } from "react-hook-form";
import { IoFastFood } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import { useModal } from '@/context/modalContext';
import Loading from '../loading';
import { getCategoriasController } from '@/controllers/categoriasController';
import { saveElementosMenuController } from '@/controllers/elementosController';

export default function NewElemento() {
    const { setOpenFormModal } = useModal()
    const { data: session, status } = useSession();
    const [selectedImage, setSelectedImage] = useState<String | null>(null);
    const [categorias, setCategorias] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(true);

    const getCategorias = async () => {
        setCategorias(await getCategoriasController());
    }

    useEffect(() => {
        try {
            getCategorias();
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    }, [])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setValue("photo", [file]);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        const response = await saveElementosMenuController(data, session?.accessToken as string);
        if(response?.code == "OK"){
            setOpenFormModal(false)
        }else{
            alert(response?.message)
        }
    });
    
    if(loading || status === "loading") return <div className='flex items-center justify-center'><Loading /></div>
    return <div className='w-full h-full max-h-[60vh] overflow-x-hidden overflow-y-auto'>
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

                <div className='col-span-full'>
                    <Label htmlFor='name'>Categoría<Required /></Label>
                    <Selector
                        id="category"
                        {...register("category", {
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            }
                        })}
                        data={categorias?
                            categorias.map((category) => ({
                                value: category.id,
                                label: category.name
                            }))
                            :[]}
                        setValue={setValue}
                        isSearch={true}
                    />
                    <span>
                        {errors.category && errors.category.type === "required" && (
                            <Errors>{errors.category.message}</Errors>
                        )}
                    </span>
                </div>

                <div className='sm:col-span-3'>
                    <Label htmlFor='name'>Nombre<Required /></Label>
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
                    <Label htmlFor='description'>Descripción<Required /></Label>
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

                <div className="col-span-full">
                    <Label htmlFor='price'>Precio<Required /></Label>
                    <div className='mt-1'>
                        <Input 
                            type='number' 
                            id='price'
                            min={0}
                            placeholder='Precio del plato'
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: "Este campo es requerido"
                                }
                            })}
                            autoComplete='off' 
                        />
                    </div>
                    <span>
                        {errors.price && errors.price.type === "required" && (
                            <Errors>{errors.price.message}</Errors>
                        )}
                    </span>
                </div>

                <div className='col-span-full'>
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
}
