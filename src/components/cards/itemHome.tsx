import React from 'react'
import Precio from '../dashboard/menus/precio'

export default function ItemHome({menu}:{menu: any}) {
    return <> <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4">
        <img className="w-36 h-full object-cover" src={`http://localhost:8080/files/${menu.photo_menu}`} alt={menu.name} />
        <div className="p-4 flex-grow">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span>{menu.name}</span>
                
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{menu.description}</p>
            <Precio menuId={menu.id} />
        </div>
  </div>
  </>
}
