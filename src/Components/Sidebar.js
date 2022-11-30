import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaCaretDown,FaCaretUp} from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { LocContext } from './LocationContext';
import { v4 as uuidv4 } from 'uuid';
// import { Inbox } from '../Screen/Inbox';
export const Sidebar = () => {
  const {Humburger} = useContext(LocContext)
  let { Draft} = useContext(LocContext)
    const [Moretab,setMoretabe]=useState(true)
    const [Views,setViews]=useState(false)
    const [folder,setfolder]=useState(true)
    const navigate=useNavigate()
    const n=((l)=>{
      navigate(l)
    
    })
  return (
    // className='sidemain'
    <div  className={Humburger?"sidemainresp":"sidemain"}>
        <div className='sidebutton'>

       <Button className='butts1' onClick={()=>n(`/compose/${uuidv4()}`)}>Compose</Button>
        </div>
        <div className='sideallcomp'>
            {/* jjjjjj */}
            <div className='onetab'>

       <Link to="/Inbox">Inbox</Link>
       <Link to="/Spam">Spam</Link>
       <Link to="/trash">Trash</Link>
   
       <Link to="/draft">Drafts {"  "} {Draft.length>0&&(Draft.length) }</Link>
              <Link to="/Archive">Archive</Link>
       <Link to="/sent">sent</Link>
       {/* <a href="/More">More</a> */}
            </div>
            <div>
            {/* {
              !Moretab&&(
                <div onClick={()=>setMoretabe(true)} className='twotab'>
           <div><FaCaretDown/> More </div>
                </div>
            )
          }
           {
             Moretab&&(
               <div className="insideMore">

                
                 <Link to="/Spam">Archive</Link>
               
                <div className='Less' onClick={()=>setMoretabe(false)} ><FaCaretUp/>Less</div>
                </div>
            )
           }
            </div> */}
            {/* <div className='Views'>
            {
          
              <div onClick={()=>setViews((pre)=>!pre)} className='twotab'>
           <div>views </div>
                </div>
            
            }
            {
              Views&&(
                <div className='Views'>

                <a href="/Inbox">Photos</a>
                <a href="/Unread">Documents</a>
                <a href="/Starred">Subscriptions</a>
                <a href="/Starred">Shopping</a>
                <a href="/Starred">Travel</a>
                </div>

              )
            }


            </div> */}
            {/* <div>
            {
          
          <div onClick={()=>setfolder((pre)=>!pre)} className='twotab'>
       <div>Folders</div>
            </div>
        
        }

        {
          folder&&(
            <div><AiOutlinePlus/> New Folder</div>

          )
        }

            </div> */}
            </div>





        </div>
    </div>
  )
}
