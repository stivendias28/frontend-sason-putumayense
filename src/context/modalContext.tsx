"use client"
import { createContext, useContext, useEffect, useState } from "react"

type newType = {
    openModal: boolean,
    openFormModal: boolean,

    setOpenModal: (value: boolean) => void
    setOpenFormModal: (value: boolean) => void
}

export const ModalContext = createContext<newType>({
    openModal: false,
    openFormModal: false,

    setOpenModal: () => {},
    setOpenFormModal: () => {}
})

export const useModal = () => {
    const context = useContext(ModalContext)
    if(!context) throw new Error("Modal context not found")
    return context
}

export const ModalProvider = ({ children }: {children: React.ReactNode}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openFormModal, setOpenFormModal] = useState(false)

    return (
        <ModalContext.Provider value={{ 
            openModal, setOpenModal, 
            openFormModal, setOpenFormModal }}>
            {children}
        </ModalContext.Provider>
    )
}