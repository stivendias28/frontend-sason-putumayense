import { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Promps extends React.InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<any>
}

export const File = forwardRef<HTMLInputElement, Promps>(({register, ...promps}, ref) => {
    return <input
        className="
            file:bg-gradient-to-b file:from-gray-200 file:to-gray-300 dark:file:from-gray-700 dark:file:to-gray-800
            file:px-6 file:py-3 file:m-5
            file:border-none
            file:rounded-full
            file:text-gray-800 dark:file:text-slate-100
            file:cursor-pointer
            file:shadow-lg file:shadow-slate-100/50 dark:file:shadow-slate-900/50

            text-gray-500 dark:text-slate-400
            cursor-pointer
        " 
        type="file" 
        accept="image/png, image/gif, image/jpeg"
        {...promps}
    />
})
