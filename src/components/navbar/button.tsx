"use client"
import {  useRouter } from "next/navigation";


const Button = () => {
    const router = useRouter();

    return <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full'
        onClick={() => router.push('/auth/login')}
        >
        Sign in
    </button>
}

export default Button;