import  Axios  from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LocContext } from "../Components/LocationContext";
// import "./login.css";
export function Login() {
  const [SignLoading,SetSigninloading]=useState(false)
  const [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const {userInfo,setUserinfo}=useContext(LocContext)
  
  // const [im,setim]=useState("")
  

  
  const LoginApi=(async(e)=>{
    e.preventDefault()
    console.log("woo",email,password)


    SetSigninloading(true)
    try {
  
      const {data}= await Axios.post("http://206.189.191.111/mail/sign_in",{email,password})
      if(data.name)
      {

        setUserinfo(data)
        localStorage.setItem("Userinfo",JSON.stringify(data))

      SetSigninloading(false)
    }else{
        SetSigninloading(false)
        console.log(data.message)
        
      }
      
      
      
    } catch (error) {
      console.log(error)
      SetSigninloading(false)
      
    }

  })
  
  const navigate=useNavigate()
  useEffect(()=>{
    if (userInfo.name) {
      navigate("/Inbox")

      
    }
  },[navigate, userInfo.name])
  






  return (
    <div className="container">
      <div className="row  ">
        <div class="container">
          <section id="formHolder">
            <div class="row">
              

              <div class="col  form">
                <div className="para">
                  <h5> Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
    dignissim elementum..</h5>
    <p>
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
   
    </p>
                </div>
                <div class="login    center form-peice switched">
                  <h1 className=" ">
                    {" "}
                    <img
                      src="https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png"
                      alt="Bootstrap"
                      width="100"
                      height="40"
                    />
                    <p className="font-bolder">Sign in to Yahoo Mail</p>
                    {SignLoading&&<Spinner animation="grow" />}
                  </h1>

                  <form onSubmit={LoginApi}>
                    <div class="txt_field">
                      <input type="text" className="logininput"  onChange={(e)=>setemail(e.target.value)}  required />
                      <div class="valid-feedback">
      Looks good!
    </div>
                      <span></span>
                      <label>username,email,mobile</label>
                      
                    </div>
                    <div class="txt_field">
                      <input className="logininput" type="password" onChange={(e)=>setpass(e.target.value)} required />
                      <span></span>
                      <label>Password</label>
                    </div>

                    <input type="submit" value="Login" />
                    <div class="pass row   ">
                      {" "}
                      <div className=" pass col">
                        {" "}
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />{" "}
                        Stay signed in
                      </div>
                      <div className="pass col">
                        <Link to="/Forget">Forgot Password? </Link>
                      </div>
                    </div>
                    <div class="signup_link">
                      Not a member? <Link  to="/Signup">Signup</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
