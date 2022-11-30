import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { BsArchiveFill } from 'react-icons/bs'
import { MdOutlineArrowBack } from 'react-icons/md'
import { RiSpamLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { Sidebar } from '../Components/Sidebar'
import { MdForwardToInbox } from "react-icons/md";
import Dropdown from 'react-bootstrap/Dropdown';

const Trash = () => {
  const [emails,setemails]=useState([])
  const [mailid, Setmailid] = useState(null)
  const [mailchoose, Setmailchoose] = useState(false)
  const [Sucess, setSucess] = useState(false)
  const [Message, Setmessage] = useState("")
  const navigate = useNavigate()
  // const [emailsloading,setemailsloading]=useState(false)
  const [emailsloading, setemailsloading] = useState(false)
  const [emailstatusloading, setemailstatusloadig] = useState(false)
  useEffect(()=>{
    if (Sucess) {
      setSucess(false)
      
    }
    const trashallmail=(async()=>{
      setemailsloading(true)
      try {
        
        const {data}= await Axios.get("http://206.189.191.111/mail/received?id=1&status=trash")
        if (data) {
          // console.log(data)
          setemailsloading(false)
          setemails(data)
        }
        
        
        
      } catch (error) {
        console.log(error)
        setemailsloading(false)
        
      }
    })
  
      trashallmail()

  },[Sucess])




// .....Api for move

const ChangingStatusApi = (async (status) => {
  console.log(status)
  setemailstatusloadig(true)
  try {
    const { data } = await Axios.patch("http://206.189.191.111/mail/move_mail", { email_id: mailid, status: status })
    if (data === "Email status changed.") {
      setSucess(true)
      console.log("yes hogay")
      setemailstatusloadig(false)
      Setmailchoose(false)
      // setemails(emails)


    } else {
      console.log(data.message)
      setemailstatusloadig(false)
      Setmessage(data)

    }

  } catch (error) {
    setemailstatusloadig(false)
    Setmessage(error)


  }


})






const statusChange = ((x) => {
  if (x === mailid) {
    Setmailid(" ")
    Setmailchoose(false)


  } else {

    Setmailchoose(true)


    Setmailid(x)
  }



})


const handlelink = ((x) => {
  navigate(`/Reply/${x.id}?path=${x.attachment_link}`)

 

})



 
  

  return (
    <main>
    <Sidebar/>
    <div className='Mainfull'>

    <div className='mainheader ReplyheadOpt'>
        {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to="/Inbox">
          <MdOutlineArrowBack/><span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
          {!mailchoose ? (<span className='Back Backarch' ><MdForwardToInbox />Inbox</span>) : <span  onClick={() => ChangingStatusApi("received")} className='back  smallMore'><MdForwardToInbox />{" "}Inbox</span>}
          {!mailchoose ? (<span className='Back Backarch' ><MdForwardToInbox />Move</span>) : <Dropdown><Dropdown.Toggle variant="success" id="dropdown-basic">
          <span className='back smallMore '  ><MdForwardToInbox />Move</span>
      </Dropdown.Toggle>
<Dropdown.Menu>
        <Dropdown.Item onClick={() => ChangingStatusApi("received")} >Inbox</Dropdown.Item>
        <Dropdown.Item onClick={() => ChangingStatusApi("archived")}  >Archive</Dropdown.Item>
        <Dropdown.Item onClick={() => ChangingStatusApi("spam")}  >Spam</Dropdown.Item>
        <Dropdown.Item onClick={() => ChangingStatusApi("trash")} >Trash</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>}
          {!mailchoose ? (<span className='Back Backarch' ><AiFillDelete /> Delete</span>) : <span onClick={() => ChangingStatusApi("trash")} className='back  smallMore'><AiFillDelete /> {"  "}Delete</span>}
        

          </div>
     
        {/* </div> */}
  
      </div>
      {emailstatusloading&&<Spinner/>}
      {emailsloading?<Spinner animation="grow" />:(
      <div className='Maininbox'>
      
     {
       emails.map((x)=>(
        
        <div className='Messages' key={x.id}>

        <input onClick={() => statusChange(x.id)} type="checkbox" checked={mailid === x.id ? true : false} name='archive' />
        <div onClick={() => handlelink(x)}>
          <div className='Screeenallmail'>

            <div>{x.send_from},{x.id}</div>
            {/* <div>{x.id}</div> */}

          </div>

          {/* <img src={x.attachment_link&&`http://206.189.191.111/media/protected/${x.attachment_link}/jpgg.jpg`} alt="no"></img> */}

        </div>
        <div>{mailid === x.id ? (<span onClick={() => ChangingStatusApi("trash")}><AiFillDelete /></span>) : ""}</div>
      </div>
      ))
     }
    

      </div>
    )}



      </div>


    {/* <Leftbar/> */}

    </main>
 
  )
}

export default Trash