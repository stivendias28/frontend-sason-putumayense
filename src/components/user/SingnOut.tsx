import { signOut } from "next-auth/react";
import { HiLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";


export default function SingnOut() {
    const router = useRouter();
    return <div className="flex items-center justify-center">
        <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center "
            onClick={() => {
                signOut();
            }}>
                Cerrar sesion
            <HiLogout className="inline ml-2" />
        </button>
    </div>
}
