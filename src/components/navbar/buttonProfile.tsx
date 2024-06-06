"use client"
import { useRouter } from "next/navigation";

function ButtonProfile({ user }: { user: any }){
    const router = useRouter()
    
    const handleClick = () => {
        router.push('/profile');
    };

    return (
        <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 pl-2 pr-4 rounded-full flex items-center justify-start'
            onClick={() => handleClick()}
        >
            <img src={`http://localhost:8080/files/${user.photo}`} alt="" className="w-8 h-8 rounded-full" />
            <span className="ml-2">{user.name}</span>
        </button>
    )
}

export default ButtonProfile
