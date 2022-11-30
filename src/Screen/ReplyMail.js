import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Spinner } from 'react-bootstrap'
import { BiCheckbox, BiUserCircle } from 'react-icons/bi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Leftbar } from '../Components/Leftbar'
import { LocContext } from '../Components/LocationContext'
import { Sidebar } from '../Components/Sidebar'
import { BsArchiveFill } from "react-icons/bs";
import { MdForwardToInbox, MdOutlineArrowBack } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RiSpamLine } from "react-icons/ri";
import { GrAttachment } from 'react-icons/gr'
import { ImCross } from 'react-icons/im'
export const ReplyMail = () => {
  const [too, Toset] = useState("")
  const [loadingMail,setLoadingMail]=useState(false)
  const [clickOn,setClickon]=useState(false)

  
  const [subject, Setsubject] = useState("")
  const [body, Setbody] = useState("")
  const [image, setimage] = useState([])


  // ..
  const [Sucess, setSucess] = useState(false)

  const [emailstatusloading, setemailstatusloadig] = useState(false)
  const [Message, Setmessage] = useState("")
  const [mailchoose, Setmailchoose] = useState(false)
  const { link } = useContext(LocContext)
  const [imageLoading, setimageLoading] = useState(false)
  console.log(link, "mehona")
  // console.log("hh")


  const { search } = useLocation()
  const loc = new URLSearchParams(search).get("path")
  console.log(loc)
  const { id } = useParams()
  const [userMail, setUserMail] = useState({})
  // const [loadingMail, setLoadingMail] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {

    if (Sucess) {
      setSucess(false)
      navigate("/Inbox")


    }

    const Singlemail = (async () => {
      setLoadingMail(true)
      try {

        const { data } = await Axios.get(`http://206.189.191.111/mail/get_email?id=${id}`)
        if (!data) {
          console.log(data)


        } else {
          setLoadingMail(false)
          console.log(data)
          setUserMail(data)

        }

      } catch (error) {

        setLoadingMail(false)
        console.log(error)
      }


    })
    Singlemail()
  }, [Sucess, id, navigate])

  // console.log(userMail.attachment_link[0])

  // ststua chnage api
  const ChangingStatusApi = (async (status) => {
    console.log(status)
    setemailstatusloadig(true)
    try {
      const { data } = await Axios.patch("http://206.189.191.111/mail/move_mail", { email_id: id, status: status })
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
  const Handlefile =  (e) => {
    console.log("hh")
    setimageLoading(true)
    try {
      const file = e.target.files[0]
      
      // sett(file)
      if (file) {
        
        setimage([...image,file])
        
        setimageLoading(false)
        // const reader=new FileReader()
     
          // reader.onloadend=()=>{
          //   // setDraft([...Draft.attachment,reader.result])
          // //  setDraft([...Draft,too,subject,])
          //  setnn([...nn,reader.result])
            
          // }
          // reader.readAsDataURL(e.target.files[0])

        

        
      
        
      }
        // setattch(file)

    } catch (error) {
      console.log(error)

    }



  }

  const removetemimg = ((cond) => {
    console.log(cond,"click")
    
    // setDraft([Draft.attachment.filter((x)=>x!==cond)])
    // setimage(image.filter((x)=>x!==cond))
 setimage(image.filter((x)=>x!==cond))



    
  })

  const handlesubmit=(()=>{

  })
  return (
    <main>
      <Sidebar />
      <div className='Mainfull'>
        <div className='mainheader ReplyheadOpt'>
          {/* <div className='Checkboxdrpdown '> */}
          <Link className='Back' to="/Inbox">
            <MdOutlineArrowBack /><span>Back</span>
          </Link>
          <div className='optionOnheaderOfReply'>
            {<span onClick={() => ChangingStatusApi("archived")} className='back'><BsArchiveFill /> {"  "}Archive</span>}
            {<Dropdown><Dropdown.Toggle variant="success" id="dropdown-basic">
              <span className='back smallMore '  ><MdForwardToInbox />Move</span>
            </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => ChangingStatusApi("received")} >Inbox</Dropdown.Item>
                <Dropdown.Item onClick={() => ChangingStatusApi("archived")}  >Archive</Dropdown.Item>
                <Dropdown.Item onClick={() => ChangingStatusApi("spam")}  >Spam</Dropdown.Item>
                <Dropdown.Item onClick={() => ChangingStatusApi("trash")} >Trash</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>}
            {<span onClick={() => ChangingStatusApi("trash")} className='back  smallMore'><AiFillDelete /> {"  "}Delete</span>}



          </div>

          {/* </div> */}

        </div>


        <div className='Reply'>
          {emailstatusloading && <Spinner />}
          {loadingMail && (<Spinner animation="grow" />)}
          {userMail &&
            (
              <>
                <div className='replymailinbox'>
                  <div className='subjectinrep'>

                    {userMail.subject}
                  </div>
                  <div className={clickOn?"Bodyreplygolden":"Bodyreply"}>
                    <div className='' onClick={()=>setClickon(!clickOn)}>

                      {/* <div> */}
                        < BiUserCircle className='picreply' />
                        {userMail.send_from }
                      <div>

                        To:{userMail.to}
                      </div>
                      {/* </div> */}
                    </div>

                    {
                      userMail.attachment_link && (userMail.attachment_link.map((x) => (
                        <div className='replymailmain'>
                          <img className='mailimage' src={x && `http://206.189.191.111${x}`} alt="no"></img>
                          <img className='mailimage' src={x && `http://206.189.191.111${x}`} alt="no"></img>
                          <img className='mailimage' src={x && `http://206.189.191.111${x}`} alt="no"></img>
                          <img className='mailimage' src={x && `http://206.189.191.111${x}`} alt="no"></img>
                          <img className='mailimage' src={x && `http://206.189.191.111${x}`} alt="no"></img>
                        </div>
                      )))
                    }
                  </div>

                </div>
        <div className='textareareply'>
        <form onSubmit={handlesubmit} >
        {loadingMail&&<div>loading....</div>}

        <div className='maincompose'>
          <div className='cross' onClick={() => navigate("/Inbox")}><ImCross /></div>
          <div className='inputdiv'>

            <input className='insend' type="text" value={too} name='to' onChange={(e) => Toset(e.target.value)} placeholder='To'></input>
          </div>
          <div className='inputdiv'>

            <input className='insend' type="text" value={subject} name='send' onChange={(e) => Setsubject(e.target.value)} placeholder='Subject'></input>
          </div>
       

        </div>
        <div className='areareply'>
          {imageLoading ? <div>Loading....</div>:(

            <label htmlFor='pic'>

              
              
               {
               (image.length!==0)&&(<div>{image.map((x,index)=>(
                 <div key={index}>
                  <div onClick={()=>removetemimg(x)} >{<ImCross/>}</div>
                 <img className='sendimage' src={x&& URL.createObjectURL(x)}  alt=""></img>
                 </div>
                  
                ))}</div>)
                    
                  }

            </label>
          )}


          <textarea className='textarea' name='body' value={body} id='pic' onChange={(e) => Setbody(e.target.value)}>

          </textarea>
        </div>

        <div className='buttdivsend'>
          <div>


            <Button type='submit' className='buttonsend' >Send</Button>
            
          </div>
          <div >
            <input id='Attach' type="file" onChange={Handlefile}></input>
            <label htmlFor="Attach">
              <GrAttachment />
            </label>
          </div>

        </div>


      </form>


        
          </div>


           
              

          </>
            )}

        </div>
      </div>
      {/* <Leftbar/> */}

    </main>
  )
}
