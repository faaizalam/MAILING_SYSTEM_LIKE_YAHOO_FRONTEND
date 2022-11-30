import React from 'react'
import { MdOutlineContactMail} from "react-icons/md";
import { BsFillCalendarDateFill} from "react-icons/bs";
import { AiFillFileText,AiFillQuestionCircle} from "react-icons/ai";
import { FiSettings} from "react-icons/fi";
export const Leftbar = () => {
  return (
    <div  className='left'>
   <div className='headleft'>
    <div className='Iconsleft'>
      <div>
      <MdOutlineContactMail className='lefticon'/>

      </div>
      <div>

      <BsFillCalendarDateFill className='lefticon'/>
      </div>
      <div>

      <AiFillFileText/>
      </div>
      <div>

      <AiFillQuestionCircle className='lefticon'/>
      </div>
    <div>
   <FiSettings className='lefticon'/>
    </div>
    </div>


   </div>


    </div>
  )
}
