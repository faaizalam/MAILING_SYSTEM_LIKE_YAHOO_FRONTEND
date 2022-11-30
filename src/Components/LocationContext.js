import React, { createContext, useEffect, useState } from 'react'

export const LocContext=createContext(null)
export const LocationContext = ({children}) => {
   const [link,setlink]=useState("")
   const [Humburger, SetHumbuerger] = useState(false)
   let [nn,setnn]=useState(localStorage.getItem("File")?JSON.parse(localStorage.getItem("File")):[])
    const [userInfo,setUserinfo]=useState(localStorage.getItem("Userinfo")?JSON.parse(localStorage.getItem("Userinfo")):{})
  const [Draft,setDraft]=useState(localStorage.getItem("Draft")?JSON.parse(localStorage.getItem("Draft")):[])
 
 useEffect(()=>{
  console.log(nn)
 },[nn])

  return (
    <LocContext.Provider
    value={{userInfo,setUserinfo,link,setlink,Draft,setDraft,nn,setnn,Humburger, SetHumbuerger}}
    >
      {children}
    </LocContext.Provider>
    
  )
}
