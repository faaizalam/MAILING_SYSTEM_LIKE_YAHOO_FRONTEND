import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { BsArchiveFill } from 'react-icons/bs'
import { MdForwardToInbox, MdOutlineArrowBack } from 'react-icons/md'
import { RiSpamLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { LocContext } from '../Components/LocationContext'
import { Sidebar } from '../Components/Sidebar'

export const SentScreen = () => {
  const { setlink } = useContext(LocContext)
  const navigate = useNavigate()

  const [emails, setemails] = useState([])
  const [emailsloading, setemailsloading] = useState(false)
  const [mailchoose, Setmailchoose] = useState(false)
  const [Sucess, setSucess] = useState(false)
  const [emailstatusloading, setemailstatusloadig] = useState(false)
  const [Message, Setmessage] = useState("")
  const [mailid, Setmailid] = useState(null)
  const handlelink = ((x) => {
    navigate(`/Reply/${x.id}?path=${x.attachment_link}`)

    setlink(x.attachment_link)
    localStorage.setItem("Link", JSON.stringify(x.attachment_link))

  })
  useEffect(() => {
    if (Sucess) {
      setSucess(false)
      
    }

    const Getallmail = (async () => {
      setemailsloading(true)
      try {
        // let data
        const { data } = await Axios.get("http://206.189.191.111/mail/received?id=1&status=sent")
        if (data) {
          setemails(data)
          setemailsloading(false)
        }



      } catch (error) {
        console.log(error)
        setemailsloading(false)

      }
    })

    Getallmail()
  }, [Sucess])

  // ...status change api
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



  return (
    <main>
      <Sidebar />
      <div className='Mainfull'>

        <div className='mainheader ReplyheadOpt'>
          {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to="/main">
            <MdOutlineArrowBack /><span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
            {!mailchoose ? (<span className='Back Backarch' ><BsArchiveFill /> Archive</span>) : <span onClick={() => ChangingStatusApi("archived")} className='back'><BsArchiveFill /> {"  "}Archive</span>}

            {!mailchoose ? (<span className='Back Backarch' ><AiFillDelete /> Delete</span>) : <span onClick={() => ChangingStatusApi("trash")} className='back'><AiFillDelete /> {"  "}Delete</span>}
            <Link Link className='Back'>
              <RiSpamLine />
              <span>More</span>

            </Link>

          </div>

          {/* </div> */}

        </div>
        {emailstatusloading&&<Spinner/>}
        {emailsloading ? <Spinner animation="grow" /> : (
          <div className='Maininbox'>
            {
              emails.map((x) => (

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
