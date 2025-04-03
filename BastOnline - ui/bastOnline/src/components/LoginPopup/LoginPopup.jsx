import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Log in")

  return (
    <div className='login-popup'>
        <form  className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
            </div>
            <div className="login-popup-input">
                {currState==="Log in"?<></>: <input type="text" placeholder='Your name' required />}
                <input type="email" placeholder='Your email' required />
                <input type="password" placeholder='Password' required/>
            </div>
            <button>{currState==="Sign up"?"Create account":"Log in"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policiy.</p>
           
            </div>
            {currState==="Log in"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
            :
            <p>Already have an account? <span onClick={()=>setCurrState("Log in")}>Log in here</span></p>

        }
        </form>
    </div>
  )
}

export default LoginPopup