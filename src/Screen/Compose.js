import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
// import React from 'react'

import { Leftbar } from '../Components/Leftbar'
import { Sidebar } from '../Components/Sidebar'
// .......
import { Button } from 'react-bootstrap';
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from 'react-router-dom';
import { GrAttachment } from "react-icons/gr";
import { LocContext } from '../Components/LocationContext';




// ...

export const Compose = () => {


  // ....
  // const [attachment, setattch] = useState({})
  // const [t, sett] = useState([])
  const [imageLoading, setimageLoading] = useState(false)
  const [exist, setExit]=useState({})

  const [too, Toset] = useState(exist.too||"")
  const [loadingMail,setLoadingMail]=useState(false)

  
  const [subject, Setsubject] = useState(exist.subject||"")
  const [body, Setbody] = useState(exist.body||"")
  const [image, setimage] = useState(exist.attachment||[])
  // let {nn,setnn} = useContext(LocContext)
  const [nn,setnn]=useState([])
  let { Draft,setDraft} = useContext(LocContext)
  
  const navigate = useNavigate()
  const { userInfo } = useContext(LocContext)
const {id:Objid}=useParams()
console.log(Objid,"objidbro")


  




  

useEffect(()=>{
  const existObj=Draft.find((x)=>x.id===Objid)
  if (existObj) {
  console.log(existObj,"jj")
   setExit(existObj)
  Toset(existObj.too||"")
  Setsubject(existObj.subject||"")
  Setbody(existObj.body||"")
 
  
  
  
  
  
  
  
}
},[Draft, Objid, exist.attachment, setnn])



  useEffect(()=>{
    
    if (Draft){
      
      
      // let aa=Draft.map((x)=>x.attachment)
      localStorage.setItem("Draft",JSON.stringify(Draft))
      
      
      
      
      
    }
    
    
   
  


  },[Draft])

  useEffect(()=>{

      
    if (too||subject||body||image) {

      // const tem=Draft.find((x)=>x.id===Objid)
      // console.log(tem,"temp")
    
      let data={
        too:too,
        subject:subject,
        
        body:body,
        from_email: userInfo.email,
        attachment:nn
       
        
        
        
        
        
        
        
        
      
        
      }
  const timer = setTimeout(() => {
    console.log(data)
   
    let existitem=Draft.find((x)=>x.id===Objid)
    if (existitem) {
      // localStorage.setItem("Draft",JSON.stringify(Draft))
      console.log(existitem,"yes")
    
      setDraft([...Draft.map((x)=>x.id===existitem.id?{...data,id:Objid}:x)])
      // localStorage.setItem("Draft",JSON.stringify(...Draft.map([...Draft.map((x)=>x.id===existitem.id?data:x)])))
    }else{
      console.log("no")
  
     
        setDraft([...Draft,{...data,id:Objid,}])
    
      
      // localStorage.setItem("Draft",JSON.stringify([...Draft,data]))


    }


        
        
        
      }, 1000)
      
      return () => clearTimeout(timer)
    }

  },[body, subject, too, userInfo.email, Draft, Objid, setDraft, image, nn])











 



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


//  useEffect(()=>{
  // e.preventDefault()
 
  
    const handlesubmit=(async(e)=>{
     e.preventDefault()
     try {
         const {data}=await Axios.post("/postman/dr/register",{to:too,attachment:image,body:body,subject:subject})

         if (data) {
           console.log(data)
           
         }
       
     } catch (error) {
       console.log(error,"no")
       
     }
       
   
    })
   


// Handlesubmit()
// },[])

  // ........
  return (
    <main>

    <Sidebar/>

    {/* ... */}

    <div className='Comp'>
      <form onSubmit={handlesubmit}  className='formsend'>
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
        <div className='area'>
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



    {/* .. */}
  
    {/* <Leftbar/> */}
    </main>
  )
}
