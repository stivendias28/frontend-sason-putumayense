import { IoFastFood } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaIceCream } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

export const linksSlideBar = [
    {
        name: 'home',
        path: '/dashboard',
        icon: <AiFillHome />
    },
    {
        name: 'Menus',
        path: '/dashboard/menus',
        icon: <IoFastFood /> 
    },
    {
        name: 'Pedidos',
        path: '/dashboard/pedidos',
        icon: <FaBoxOpen />
    },
    {
        name: 'Categorias',
        path: '/dashboard/categories',
        icon: <MdCategory />
    }


]