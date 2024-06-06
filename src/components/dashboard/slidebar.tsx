import React from 'react'
import { linksSlideBar } from '@/interfaces/routeSlideBar';
import Link from 'next/link';

export default function Slidebar() {
    return (
        <section className='h-full'>
            <div className='w-full h-full'>
                <div className='w-[90%] bg-white dark:bg-gray-800 flex flex-col items-start rounded-xl gap-y-6 py-4 px-5 h-full'>
                    {linksSlideBar.map((link) => (
                        <Link href={`${link.path}`} key={link.name} className='text-lg lg:text-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full p-2 rounded-md'>
                            <span className='flex items-center'>
                                {link.icon}
                                <span className={`hidden md:block ml-3 text-sm`}>{link.name}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
