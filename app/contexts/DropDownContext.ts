import React from 'react'


export interface Superuser {
    id: number;
    username: string;
   
  }

interface DropDownContextType {
  isDropdownOpen: boolean,
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleDropdown: () => void

}

const DropDownContext = React.createContext<DropDownContextType>({} as DropDownContextType)


export default DropDownContext;