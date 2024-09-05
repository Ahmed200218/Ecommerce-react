import { createContext, useEffect, useState } from "react";



export let UserTokencontext = createContext(null);

export default function UserTokencontextProvider({ children }) {

    let [token, setToken] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    })

    return <UserTokencontext.Provider value={{ token , setToken }}>
        {children}
    </UserTokencontext.Provider>
}