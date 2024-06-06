import { UseFormRegister } from "react-hook-form";
import { forwardRef } from "react";

interface Promps extends React.DataHTMLAttributes<HTMLInputElement>{
    register?: UseFormRegister<any>
}

export const Date = forwardRef<HTMLInputElement, Promps>(({register, ...promps}, ref) => {
    return (
        <input
            type="date"
            {...register}
            {...promps}
            ref={ref}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 Outline-none focus:outline-none bg-slate-50 dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-slate-50 dark:ring-slate-50 dark:focus:ring-slate-50"
        />
    )
})

