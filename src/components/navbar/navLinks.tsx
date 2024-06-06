"use client"
import { linksNavbar } from '@/interfaces/navbarRoutes'
import Link from 'next/link'
import { useState } from 'react'
import { HiChevronDown } from "react-icons/hi";

const NavLinks = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    return(
        <>
            {linksNavbar.map((link) => (
                <div key={link.label}>
                    <div className='px-3 text-left group'>
                        <h1 
                            className='text-gray-800 dark:text-white py-7 font-bold flex items-center justify-between md:pr-0 pr-5 group cursor-pointer'
                            onClick={() => {
                                heading !== link.label ? setHeading(link.label) : setHeading("");
                                setSubHeading("");
                            }}
                        >
                            {link.label}
                            {link.submenu === true && 
                                <span className='inline md:pt-1 md:ml-1'>
                                    <HiChevronDown className={`md:group-hover:rotate-180  text-2xl duration-100 ${heading === link.label ? "rotate-180" : ""}`} /> 
                                </span>
                            }
                        </h1>
                        {link.submenu && (
                            <div className='cursor-default'>
                                <div className='absolute top-20 hidden group-hover:md:block hover:md:block'>
                                    <div className='py-3'>
                                        <div className='w-4 h-4 left-3 absolute mt-1 bg-white dark:bg-gray-800 rotate-45'></div>
                                    </div>

                                    <div className='bg-white dark:bg-gray-800 rounded-sm p-3.5 grid grid-cols-3 gap-10 z-40'>
                                        {link.sublinks?.map((sublink) => (
                                            <div key={sublink.label}>
                                                <h1 className='text-gray-800 dark:text-white text-lg font-semibold uppercase'>
                                                    {sublink.label}
                                                </h1>
                                                
                                                {sublink.sublinks?.map((slink) => (
                                                    <li key={slink.label} className='text-sm my-2.5'>
                                                        <Link href={slink.path} className='text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 uppercase cursor-pointer'>{slink.label}</Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className={` ${heading === link.label ? "md:hidden" : "hidden"}`}>
                        {link.sublinks?.map((slink) => (
                            <div key={slink.label}>
                                <div>
                                    <h1 
                                        className='text-gray-800 dark:text-white uppercase py-4 pl-7 font-semibold md:pr-0 pr-5 flex items-center justify-between cursor-pointer'
                                        onClick={() =>
                                            subHeading !== slink.label ? setSubHeading(slink.label) : setSubHeading("")
                                        }
                                    >
                                        {slink.label}
                                        {slink.sublinks && <HiChevronDown className={`text-2xl duration-100 ${subHeading === slink.label ? "rotate-180" : ""}`} /> }
                                    </h1>

                                    <div className={`${subHeading === slink.label ? "md:hidden" : "hidden"}`}>
                                        {slink.sublinks?.map((slink) => (
                                            <li key={slink.label} className='py-3 pl-14'>
                                                <Link href={slink.path} className='text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 uppercase cursor-pointer'>
                                                    {slink.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}

export default NavLinks;