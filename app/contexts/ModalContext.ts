import React from 'react'




interface ModalContextProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>

}

const ModalContext = React.createContext<ModalContextProps>({} as ModalContextProps)


export default ModalContext;