import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './Registration.css';

function Login(){

    const navigation = useNavigate();

    const [loginData,setLoginData]=useState({'username':'','firstname':'','lastname':'','email':'','password':''});
    const [error,setError] = useState([])

    async function subitbtn(){
        let d = await fetch(`https://dev.arkmnetwork.com/api/user-register?sponsor=admin&username=${loginData.username}&firstname=${loginData.firstname}&lastname=${loginData.lastname}t&email=${loginData.email}&password=${loginData.password}`,{
            headers:{
                'Content-Type':'application/json',
            },
            method:'POST',
        })
        d = await d.json();
        if(d.status){
            alert(d.msg);
            navigation('/login');
        }
        else{
            setError(d);
        }
    }
;
    return(
        <div className="regmain">
            {error.status&&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Info alert!</span> Your Account Created.
            </div>}
            {
                error.errors&&alert(JSON.stringify(error.errors))
            }
            <h1 className="reghead">New Registration</h1>
            <div className="regbody">
                <div className="regimg">
                    <img className="reglogo" src={process.env.PUBLIC_URL+'/logo/logo.png'} alt="not_found"/>
                </div>
                <div className="reguserpass">
                    <input className="reginputbox" type="text" value={loginData.username} placeholder="Username" onChange={(e)=>{setLoginData({...loginData,'username':e.target.value})}}/>
                    <input className="reginputbox" type="text" value={loginData.firstname} placeholder="First Name" onChange={(e)=>{setLoginData({...loginData,'firstname':e.target.value})}}/>
                    <input className="reginputbox" type="text" value={loginData.lastname} placeholder="Last Name" onChange={(e)=>{setLoginData({...loginData,'lastname':e.target.value})}}/>
                    <input className="reginputbox" type="email" value={loginData.email} placeholder="email" onChange={(e)=>{setLoginData({...loginData,'email':e.target.value})}}/>
                    <input className="reginputbox" type="password" value={loginData.password} placeholder="Password" onChange={(e)=>{setLoginData({...loginData,'password':e.target.value})}}/>
                </div>
                <div className="regbtnnewreg">
                    <input className="regbtnnewregbtn" type="button" value={'Registration'} onClick={subitbtn}/>
                </div>
            </div>
        </div>
    );
}

export default Login;