import React, { useContext, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsArchiveFill } from 'react-icons/bs'
import { MdOutlineArrowBack } from 'react-icons/md'
import { RiSpamLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { LocContext } from '../Components/LocationContext'
import { Sidebar } from '../Components/Sidebar'

const Draft = () => {

  const navigate=useNavigate()
  let { Draft,setDraft} = useContext(LocContext)

  useEffect(()=>{
    if (Draft){
      console.log(Draft,"dd")
      localStorage.setItem("Draft",JSON.stringify(Draft))
      
    }

  },[Draft])

  const handlelink=((x)=>{

    navigate(`/compose/${x.id}`)

  })


  return (
    <>
   <main>
     
    <Sidebar/>
    <div className='Mainfull'>
    <div className='mainheader ReplyheadOpt'>
        {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to="/main">
          <MdOutlineArrowBack/><span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
           <Link className='Back '>
            
        <BsArchiveFill />
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

      <div className='Maininbox'>
      
      {
        Draft.filter((x)=>x.id!=="0").map((x)=>(
         <div className='Messages'>
 
           <input type="checkbox" name='archive' />
          <div onClick={()=>handlelink(x)}>
           <div className='Screeenallmail'>
 
           <div>me,{x.send_from}</div>
           <div>me,{x.id}</div>
           </div>
           
         {/* <img src={x.attachment_link&&`http://206.189.191.111/media/protected/${x.attachment_link}/jpgg.jpg`} alt="no"></img> */}
 
           </div>
           </div>
       ))
      }
     
 
       </div>

      </div>
      <div>

      </div>
    
    {/* <Leftbar/> */}
    
    
     </main>
    </>
  )
}

export default Draft