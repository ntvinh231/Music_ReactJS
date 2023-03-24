import React, { createContext, useEffect, useState } from 'react';
import request from 'utils/request';

export const UserContext = createContext()

const GetDataUser = () => {
    const [currentUser, setCurrentUser] = useState();
    const [refresh, setRefresh] = useState(0)
    useEffect(()=>{
        request({
            url: '/api/users/get-current-user'
        }).then(res=>{
            if(res.status !== 200){
                localStorage.removeItem("token");
                setCurrentUser();
                return;
            }
            setCurrentUser(res.data)
        }).catch(e=>{
            // localStorage.removeItem("token");
            setCurrentUser();
        })
    },[refresh])

    return {currentUser, setCurrentUser, setRefresh};
}

export const UserProvider = ({children}) =>{
    return (
        <UserContext.Provider value={{...GetDataUser()}}>
         {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(UserContext)
