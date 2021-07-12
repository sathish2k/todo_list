import { createContext, useState } from "react";
import {Get} from '../services/auth'

const UserContext = createContext()

const UserProvider = (props) => {
    const [value, setValue] = useState(null)

    const setUser = (user)=>{
        setValue(user)
    }
    const getUser = async ()=>{
        let user = await Get(process.env.baseUrl+'/user/profile',{withCredentials:true})
        if(user){
            setUser(user.user)
        }
    }
    return (
        <UserContext.Provider value={{setUser,getUser,user:value}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider