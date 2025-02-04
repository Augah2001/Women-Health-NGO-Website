import React from 'react'


export interface Superuser {
    id: number;
    username: string;
   
  }

interface UserContextProps {
  user: Superuser | null,
  setUser: React.Dispatch<React.SetStateAction<Superuser | null>>

}

const UserContext = React.createContext<UserContextProps>({} as UserContextProps)


export default UserContext;