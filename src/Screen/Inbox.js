import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { LocContext } from '../Components/LocationContext'
import { Mainin } from '../Components/Mainin'
import { Sidebar } from '../Components/Sidebar'

export const Inbox = () => {
  
  return (
    <main>
     <>

    <Sidebar/>

    <Mainin/>
    {/* <Leftbar/> */}
     </>
    {/* </div> */}
    
     </main>
  )
}
