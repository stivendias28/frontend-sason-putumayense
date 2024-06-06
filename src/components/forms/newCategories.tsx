"use client"
import { useModal } from '@/context/modalContext';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Loading from '../loading';
import { Errors, Input, Label } from '@/components/auth';
import { saveCategoriesController } from '@/controllers/categoriesController';

export default function NewCategories() {
    const { setOpenFormModal } = useModal()
    const { data: session, status } = useSession();
    const [errorsForm, setErrorsForm] = useState<{
        request: string
    } | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data: any) => {
        const response = await saveCategoriesController(data, session?.accessToken as string);
        if(response?.code == "OK"){
            setOpenFormModal(false)
        }else{
            setErrorsForm({
                request: response?.message
            })
        }
    })

    if(status === "loading") return <Loading />

    return (
        <div className='w-full h-full max-h-[35vh] overflow-x-hidden overflow-y-auto'>
            <form 
                onSubmit={onSubmit} 
                method='POST'
            >
                <div className="grid grid-cols-1 gap-x-3 sm:gap-y-3 gap-y-1 sm:grid-cols-6 px-2 mx-auto">
                    <div className='sm:col-span-6'>
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

                    <div className='sm:col-span-6'>
                        <button
                            type='submit'
                            className='w-full mt-5 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                        >
                            Guardar
                        </button>
                    </div>

                    <div className='sm:col-span-6'>
                        {errorsForm?.request && <Errors>{errorsForm?.request}</Errors>}
                    </div>

                </div>
            </form>
        </div>
    )
}
