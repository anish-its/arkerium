import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

export default function Dashboard(){
    const [user,setUser] = useState();
    const [data,setData] = useState();
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/dashboard',{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{
            setData(value.data);
            setUser(value.user);
        })
    },[])
    return(
        <>
            <Navbar/>
            {user&&<p className="font-normal pl-10 text-gray-700 dark:text-gray-400">welcome back, {user.username}</p>}
            <div className="p-5 grid grid-cols-4">
                {
                    (()=>{
                        const card = [];
                        for(let d in data)
                        {
                            if(d!=="referral_link"){
                                card.push(
                                <div key={d} className="block max-w-full p-6 m-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{d}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Balance:</p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{data[d]}</p>
                                </div>
                                )
                            }
                            else{
                                card.push(
                                    <div key={d} className="pl-3">
                                        <p className="font-normal text-gray-700 dark:text-gray-400">{d}</p>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">{data[d]}</p>
                                    </div>
                                )
                            }
                        }
                        return card
                    })()
                }
            </div>
        </>
    )
}