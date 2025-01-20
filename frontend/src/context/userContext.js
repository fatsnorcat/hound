import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('/profile').then(({response}) => {
            setUser(response.data.user)
            console.log('User updated:', user)
        })
        .catch(() => {
            setUser(null)
        })
    }, [])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext)
}