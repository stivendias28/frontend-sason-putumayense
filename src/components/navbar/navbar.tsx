"use client";
import Link from 'next/link';
import { IoMdRestaurant } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Button from './button';
import NavLinks from './navLinks';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ButtonProfile from './buttonProfile';
import Loading from '@/components/loading';
import { AiFillHome } from 'react-icons/ai';
import { MdSpaceDashboard } from "react-icons/md";

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const { data: session, status } = useSession();

    return (
        <nav className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center font-medium justify-around'>
                <div className='flex justify-between items-center z-50 p-5 md:w-auto w-full'>
                    <Link href="/">
                        <IoMdRestaurant className='cursor-pointer text-4xl text-gray-800 dark:text-white' />
                    </Link>
                    <div 
                        className='md:hidden cursor-pointer' 
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {openMenu ? <MdClose className='text-3xl text-gray-800 dark:text-white' /> 
                        : <FiMenu className='text-3xl text-gray-800 dark:text-white' />}
                    </div>
                </div>

                <ul className='md:flex hidden uppercase items-center gap-8'>
                    <li>
                        <Link href="/" className='py-7 px-3 inline-block text-gray-800 dark:text-white'>
                            <span className='flex items-center'>
                                <AiFillHome className='mr-2'/>
                                Inicio
                            </span>
                        </Link>
                    </li>
                    {/*<NavLinks />*/}
                    {session && 
                        session.user.rol === "ADMIN" && <li>
                        <Link href="/dashboard" className='py-7 px-3 inline-block text-gray-800 dark:text-white'>
                            <span className='flex items-center'>
                                <MdSpaceDashboard className='mr-2' />
                                Administración
                            </span>
                        </Link>
                    </li>}
                    
                </ul>

                <div className='md:block hidden'>
                    {status === "loading" ? 
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full flex items-center justify-start'>
                            <Loading />
                        </button> : !session ? <Button /> : <ButtonProfile user={session.user} />}
                    
                </div>
                

                {/* Mobile Menu */}
                <ul className={`md:hidden bg-white dark:bg-gray-800 absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${openMenu ? "left-0" : "-left-full"}`}>
                    <li>
                        <Link href="/" className='py-7 px-3 inline-block text-gray-800 dark:text-white'>
                            <span className='flex items-center'>
                                <AiFillHome className='mr-2'/>
                                Inicio
                            </span>
                        </Link>
                    </li>

                    {session && 
                        session.user.rol === "ADMIN" && 
                        <li>
                            <Link href="/dashboard" className='py-7 px-3 inline-block text-gray-800 dark:text-white'>
                                <span className='flex items-center'>
                                    <MdSpaceDashboard className='mr-2' />
                                    Administración
                                </span>
                            </Link>
                        </li>}

                    {/*<NavLinks />*/}
                    <div className="py-5">
                        {!session ? <Button /> : <ButtonProfile user={session.user} />}
                    </div>
                </ul>
            </div>
        </nav>
    );
}
