import React, { useState,useRef } from "react";
import {useNavigate} from 'react-router-dom'
import './Login.css';

function Login(){
    const navigation = useNavigate();
    const passwdref = useRef(null);

    const [loginData,setLoginData]=useState({'username':'','password':''});
    const [showPasswd,setShowPasswd] = useState(false);

    function passToText(){
        if(passwdref.current.type==='text'){
            passwdref.current.type='password';
            setShowPasswd(false);
        }
        else{
            passwdref.current.type='text';
            setShowPasswd(true);
        }
    }

    async function subitbtn(){
        let d = await fetch('https://dev.arkmnetwork.com/api/user-login',{
            headers:{
                'Content-Type':'application/json',
            },
            method:'POST',
            body:JSON.stringify(loginData),
        })
        d = await d.json();
        localStorage.setItem('token',d.access_token)
        localStorage.setItem('expires_at',d.expires_at)
        localStorage.setItem('token_type',d.token_type)
        navigation('/dashboard');
    }
;
    return(
        <div className="loginmain">
            <h1 className="loginhead">LOGIN</h1>
            <div className="loginbody">
                <div className="loginimg">
                    <img className="loginlogo" src={process.env.PUBLIC_URL+'/logo/logo.png'} alt="not_found"/>
                </div>
                <div className="loginuserpass">
                    <input className="logininputbox" type="text" value={loginData.username} placeholder="Username" onChange={(e)=>{setLoginData({...loginData,'username':e.target.value})}}/>
                    <div className="loginpasswd">
                        <input className="logininputbox logininputboxpass" type="password" ref={passwdref} value={loginData.password} placeholder="Password" onChange={(e)=>{setLoginData({...loginData,'password':e.target.value})}}/>
                        {
                            !showPasswd&&<img className="loginpasswdicon" onClick={passToText} src={process.env.PUBLIC_URL+'/logo/show.png'} alt="not_found"/>
                        }
                        {
                            showPasswd&&<img className="loginpasswdicon" onClick={passToText} src={process.env.PUBLIC_URL+'/logo/hide.png'} alt="not_found"/>
                        }
                    </div>
                    <div className="loginforgot">
                        <span className="loginforgotbox">Forgot Password</span>
                    </div>
                </div>
                <div className="loginbtnnewreg">
                    <input className="loginbtnnewregbtn" type="button" value={'Login'} onClick={subitbtn}/>
                    <div className="loginbtnnewregbox">
                        <span className="loginbtnnewregmsg">Don't have account yet?</span>
                        <span className="loginbtnnewregreg">Sign Up Now</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;