import React,{useState,useEffect,useReducer} from 'react';
import Navbar from "../../Navbar/Navbar";

export default function Two_Team(){
    function reducer(state, action) {
        return [...state,action.data]
    }
    let count = 0;
    let queue = [];
    const [member,setMember] = useState();
    const [twoteamdata,setTwoteamdata] = useState();
    const [twoteamtree, setTwoteamtree] = useReducer(reducer,[]);
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/network/genealogy',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{
            setTwoteamdata(value);
            setTwoteamtree({data:value.user});
            count++;
            queue.push(value.user.left);
            queue.push(value.user.right);
            callBackUser();
        })
    },[])
    async function callBackUser(){
        if(count<13){
            let c = queue.shift();
            if(c!=null){
                let result = await fetch(`https://dev.arkmnetwork.com/api/app/network/genealogy/${c.username}`,{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${localStorage.getItem('token')}`,
                    },
                    method:'GET',
                })
                result = await result.json();
                setTwoteamtree({data:result.user});
                queue.push(result.user.left);
                queue.push(result.user.right);
                callBackUser();
            }
            else{
                setTwoteamtree({data:null});
                callBackUser();
            }
            count++;
        }
    }
    function searchTeam(){
        fetch(`https://dev.arkmnetwork.com/api/app/network/genealogy?member=${member}&search=true`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{
            setTwoteamdata(value);
            setTwoteamtree({data:value.user});
            count++;
            queue.push(value.user.left);
            queue.push(value.user.right);
            callBackUser();
        })
    }
    return(
        <>
        <Navbar/>
        <span className='m-10'>Two Team</span>
        {twoteamdata&&<div className='flex flex-wrap m-4'>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">TOTAL REFERRALS</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">{parseFloat(twoteamdata.totalReferral)}</p>
        </div>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">PAID REFERRALS</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">{parseFloat(twoteamdata.paidReferral)}</p>
        </div>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">TOTAL TEAM</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">{parseFloat(twoteamdata.totalTeam)}</p>
        </div>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">LEFT TEAM</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">{parseFloat(twoteamdata.leftTeam)}</p>
        </div>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">RIGHT TEAM</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">{parseFloat(twoteamdata.rightTeam)}</p>
        </div>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">TOTAL PACKAGE</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">$ {parseFloat(twoteamdata.totalPackage)}</p>
        </div>
        <div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">TWO TEAM BONUS</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">$ {parseFloat(twoteamdata.twoTeamBonus)}</p>
        </div>
        </div>}
        <div className='m-6 p-3 rounded-md bg-slate-200'>
            <span className='m-5'>Two Team</span>
            <div className="flex items-center gap-10 ml-5 mt-5">
                <div className="flex flex-col gap-2">
                    <label>Search By</label>
                    <input type="text" className="rounded border border-slate-950 p-1" value={member} onChange={(e)=>setMember(e.target.value)} placeholder="Search by Username" name="member"/>
                </div>
                <button type="submit" className="border px-4 py-2 rounded-md bg-blue-500" name="search" onClick={searchTeam} value="true">Search</button>
            </div>
        </div>
        {twoteamtree&&<div className='flex flex-col justify-center items-center m-6 p-3 gap-16'>
            <div className='flex flex-row justify-center items-center'>
                {
                    twoteamtree.slice(0,1).map((data,index)=>{
                        if(data==null){
                            return(
                                <div key={index} className=''>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"} alt=''/>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div key={index} className='flex flex-col'>
                                    {console.log(data)}
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"+data.profile.avatar} alt=''/>
                                    <span>{data.username}</span>
                                    <span>{data.status?"Paid":"Unpaid"}</span>
                                    <span></span>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='flex flex-row gap-[26rem] justify-center items-center'>
                {
                    twoteamtree.slice(1,3).map((data,index)=>{
                        if(data==null){
                            return(
                                <div key={index} className=''>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"} alt=''/>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div key={index} className='flex flex-col'>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"+data.profile.avatar} alt=''/>
                                    <span>{data.username}</span>
                                    <span>{data.status?"Paid":"Unpaid"}</span>
                                    <span></span>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='flex flex-row gap-[12rem] justify-center items-center'>
                {
                    twoteamtree.slice(3,7).map((data,index)=>{
                        if(data==null){
                            return(
                                <div key={index} className=''>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"} alt=''/>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div key={index} className='flex flex-col'>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"+data.profile.avatar} alt=''/>
                                    <span>{data.username}</span>
                                    <span>{data.status?"Paid":"Unpaid"}</span>
                                    <span></span>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='flex flex-row gap-[12rem] justify-center items-center'>
                {
                    twoteamtree.slice(7).map((data,index)=>{
                        if(data==null){
                            return(
                                <div key={index} className=''>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"} alt=''/>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div key={index} className='flex flex-col'>
                                    <img className='w-14 h-14 border rounded-full' src={"https://dev.arkmnetwork.com/en/avatars/"+data.profile.avatar} alt=''/>
                                    <span>{data.username}</span>
                                    <span>{data.status?"Paid":"Unpaid"}</span>
                                    <span></span>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>}
        </>
    )
}