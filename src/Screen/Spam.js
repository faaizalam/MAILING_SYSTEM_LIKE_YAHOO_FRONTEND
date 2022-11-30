import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsArchiveFill } from 'react-icons/bs'
import { MdOutlineArrowBack } from 'react-icons/md'
import { RiSpamLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { Sidebar } from '../Components/Sidebar'

const Spam = () => {
  return (
   <main>
   <Sidebar/>
   <div className='Mainfull'>
        <div className='mainheader ReplyheadOpt'>
        {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to="/main">
          <MdOutlineArrowBack/><span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
           <Link className='Back'>
            
        <BsArchiveFill/>
        <span>Archive</span>
          

           </Link>
           <Link Link className='Back'>

        <AiFillDelete/>
        <span>Delete</span>
           </Link>
           <Link Link className='Back'>
        <RiSpamLine/>
        <span>More</span>

           </Link>

          </div>
     
        {/* </div> */}
  
      </div>

      
      </div>





   {/* <Leftbar/> */}

   </main>
  )
}

export default Spam