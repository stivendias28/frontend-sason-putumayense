"use client";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { forwardRef } from "react";
import { useState, useEffect, useRef } from "react";

interface Promps extends React.InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    isSearch: boolean | false;
    data: {
        value: number,
        label: string
    }[];
}

export const Selector = forwardRef<HTMLInputElement, Promps>(({data, register, setValue, ...promps}, ref) => {
    const [Search, setSearch] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const dropdown = dropdownRef.current;

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShow(false);
        }
    };

    useEffect(() => {
        if (dropdown) {
            const rect = dropdown.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            dropdown.style.bottom = (rect.bottom > windowHeight) ? "100%" : "auto";
        }
    }, [show]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full font-medium cursor-pointer relative">
            <div
                onClick={() => setShow(!show)}
                className="bg-slate-50 dark:bg-gray-800 text-gray-800 dark:text-slate-50 w-full p-2 flex justify-between items-center border-[2px] border-slate-200 dark:border-gray-700 rounded"
            >
                <span className={`text-sm ${inputValue ? "text-slate-800 dark:text-slate-50" : "text-slate-400 dark:text-gray-400"} truncate`}>{inputValue? inputValue.toLocaleUpperCase() : promps.placeholder}</span>
                <FiChevronDown className={`${show && "rotate-180"} text-gray-500 dark:text-slate-50 transition-all duration-300`} />
            </div>

            <ul 
                className={`w-full shadow-md z-50 absolute bg-slate-50 dark:bg-gray-800 mt-2 mb-2 overflow-x-hidden overflow-y-auto ${show ? "max-h-60 border border-gray-300 dark:border-gray-700" : "max-h-0"}`}
                ref={dropdownRef}
                style={{bottom: "auto"}}     
            >
                {promps?.isSearch ?
                    <div className="flex items-center px-2 sticky top-0 bg-slate-50 dark:bg-gray-800">
                        <IoSearch className="text-gray-500 dark:text-slate-50" />
                        <input
                            type="text"
                            placeholder="Search..."
                            autoComplete="off"
                            value={Search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 outline-none placeholder:text-gray-500 dark:placeholder:text-slate-50 bg-slate-50 dark:bg-gray-800 text-gray-800 dark:text-slate-50"
                        />
                    </div> 
                    : 
                    null
                }

                {data.length > 0 ? 
                    data.map((item) => (
                        <li 
                            key={item.value}
                            className={`p-2 text-sm bg-slate-50 hover:bg-slate-100 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-50 transition-all duration-300
                                ${item?.label?.toLocaleLowerCase().includes(Search?.toLocaleLowerCase()) ? "block" : "hidden"}
                                ${item?.label?.toLocaleLowerCase() === inputValue?.toLocaleLowerCase() ? "bg-slate-300 dark:bg-gray-600" : ""}
                            `}
                            onClick={() => {
                                setInputValue(item.label);
                                setValue(promps.name!, item.value);
                                setSearch("");
                                setShow(false);
                            }}
                        >
                            {item.label.toLocaleUpperCase()}
                        </li>
                    ))
                    : 
                    <li className="p-2 text-sm text-center bg-slate-50 hover:bg-slate-100 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-slate-50">No se ha encontrado información</li>
                }
            </ul>
        </div>
    )
})
