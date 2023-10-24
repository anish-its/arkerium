import React, { useState,useEffect } from "react";
import Navbar from "../Navbar/Navbar";

export default function Twoteampayout(){
    const [twoteamlist,setTwoteamlist] = useState();
    const [searchLiq,setSearchLiq] = useState({"username":"","from_date":"","to_date":""});

    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/payout/report',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTwoteamlist(value.payouts)})
    },[])

    function twoteampayoutSearch(){
        fetch(`https://dev.arkmnetwork.com/api/app/payout/report?username=${searchLiq.username}&from_date=${searchLiq.from_date}&to_date=${searchLiq.to_date}&search=true`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTwoteamlist(value.payouts)})
    }

    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/payout/report?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTwoteamlist(value.payouts)})
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/payout/report?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTwoteamlist(value.payouts)})
    }

    return(
        <>
        <Navbar/>
        <div className="m-4">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center">
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" value={searchLiq.username} onChange={(e)=>setSearchLiq({...searchLiq,"username":e.target.value})} className="border rounded-md p-1 border-gray-950" placeholder="Enter Username"/>
                </div>
                <div className="flex flex-row gap-3 flex-wrap">
                    <label>Payout Date Between</label>
                    <div className="flex gap-2" id="date-range">
                        <span>Start Date: </span>
                        <input type="date" className="border rounded-md border-gray-950" name="from_date" onChange={(e)=>setSearchLiq({...searchLiq,"from_date":e.target.value})} autoComplete="off" placeholder="Start Date"/>
                        <span>End Date: </span>
                        <input type="date" className="border rounded-md border-gray-950" name="to_date" onChange={(e)=>setSearchLiq({...searchLiq,"to_date":e.target.value})} autoComplete="off" placeholder="End Date"/>
                    </div>
                </div>
                <div className="flex">
                    <label htmlFor="">&nbsp;</label>
                    <button type="submit" onClick={twoteampayoutSearch} className="border rounded-md border-gray-900 px-4 py-1 bg-blue-500" name="search" value="true">Search</button>
                </div>
            </div>
		</div>
        <div>
            <span className="ml-4">Liquidity Details:</span>
            {twoteamlist&&<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Business
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Previous Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Business
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Previous Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Left Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Right Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mathching Business
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Days
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid Days
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (()=>{
                            if(twoteamlist){
                                let table = []
                                for(let d of twoteamlist.data){
                                    table.push(
                                        <tr key={d.username+d.created_at} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                {d.username}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.left_business}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.prev_left_balance}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.right_business}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.prev_right_balance}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.left_balance}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.right_balance}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.total_payout}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.commission}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.total_days}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.count_day}
                                            </td>
                                        </tr>
                                    )
                                }
                                return table;
                            }
                        })()
                    }
                    </tbody>
                </table>
                <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{twoteamlist.from}-{twoteamlist.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{twoteamlist.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(twoteamlist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{twoteamlist.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(twoteamlist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>}
        </div>
        </>
    )
}