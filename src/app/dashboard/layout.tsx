import { ModalProvider } from '@/context/modalContext'
import Slidebar from '@/components/dashboard/slidebar'
import React from 'react'

export default function DashboardLayout({children}:{children: React.ReactNode}){
    return <ModalProvider>
        <div className='w-full h-[70vh] xl:h-[86vh]'>
            <div className='grid grid-cols-12 pt-5 px-5 md:px-10 lg:px-20 h-full pb-5'>
                <div className='col-span-3 lg:col-span-2 h-full' >
                    <Slidebar />
                </div>
                <div className='col-span-9 lg:col-span-10 h-full'>
                    <div className='w-full h-full'>
                        <div className='w-full h-full bg-white dark:bg-gray-800 p-5 rounded-xl'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ModalProvider>
}
