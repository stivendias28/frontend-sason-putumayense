import { useModal } from "@/context/modalContext";
import { VscLoading } from "react-icons/vsc";
import NewPedido from "../forms/newPedido";
import { IoMdClose } from "react-icons/io";

export default function ModalNewPedido() {
    const { setOpenFormModal } = useModal();
    
    return <div className='w-full md:w-[70%] lg:w-[50%] min-h-[60vh] max-h-[80vh] bg-white dark:bg-gray-800 p-5 rounded-lg relative'>
    <div className='w-full flex items-center justify-between px-1 py-2 border-b mb-2'>
        <span className='text-lg font-bold flex items-center'>
            Registrar nuevo pedido
        </span>
        <button onClick={() => setOpenFormModal(false)}>
            <IoMdClose className='text-2xl mr-2 font-bold' />
        </button>
    </div>
    <div className='pt-5 pb-2'>
        <NewPedido /> 
    </div>
</div>
}
