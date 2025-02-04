import React from 'react'


export interface Province {
    id: number;
    name: string;
    code: string;
  }

interface UserContextProps {
  province: Province | null,
  setProvince: React.Dispatch<React.SetStateAction<Province | null>>

}

const ProvinceContext = React.createContext<UserContextProps>({} as UserContextProps)


export default ProvinceContext;