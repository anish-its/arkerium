import React,{useState,useEffect} from "react";
import Navbar from "../../Navbar/Navbar";
import { renderToString } from 'react-dom/server';

export default function Unilevel_Tree(){
    const [unilevellist,setUnilevellist] = useState();
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/network/team/admin',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setUnilevellist(value.data)})
    },[])
    function listFun(e){
        fetch(`https://dev.arkmnetwork.com/api/app/network/team/${e.target.id}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{
            let nam = e.target.innerText.split('\n')[0];
            e.target.innerText = "";
            e.target.innerHTML = "";
            if(e.target.dataset.click==="false"){
                e.target.dataset.click = "true"
                e.target.innerHTML = 
                renderToString(
                <>
                    {nam}
                    <ul className="flex flex-col ml-3">
                        {
                            value.data.map((d,index)=>
                                d.children_status
                                ?<li className="text-teal-500 cursor-pointer" onClick={listFun} data-click="false" id={d.id} key={index}>{d.text}</li>
                                :<li className="text-red-400" key={d.id}>{d.text}</li>
                            )
                        }
                    </ul>
                </>
                )
            }
            else{
                e.target.dataset.click = "false"
                e.target.innerText = nam;
            }
        })
    }
    return(
        <>
        <Navbar/>
        <div>
            <span className="ml-4">Direct Referrals</span>
            <div className="relative m-4 p-3 overflow-x-auto shadow-md sm:rounded-lg">
                {unilevellist&&<ul>
                    {
                        unilevellist.map((d,index)=>
                            d.children_status
                            ?<li className="text-teal-500 cursor-pointer" data-click="false" onClick={listFun} id={d.id} key={index}>
                                {d.text}
                            </li>
                            :<li className="text-red-400" key={d.id}>{d.text}</li>
                        )
                    }
                </ul>}
            </div>
        </div>
        </>
    )
}