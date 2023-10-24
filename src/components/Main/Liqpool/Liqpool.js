import React from "react";
import { useEffect,useState } from "react";
import Navbar from "../Navbar/Navbar";

export default function Liqpool(){
    const [liqpoollist,setLiqpoollist] = useState();
    const [searchLiq,setSearchLiq] = useState({"username":"","status":""});
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/user-liquidity-details',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setLiqpoollist(value.liquidityDetails))
    },[])
    function liqpoolSearch(){
        fetch(`https://dev.arkmnetwork.com/api/app/user-liquidity-details?username=${searchLiq.username}&status=${searchLiq.status}&search=true`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setLiqpoollist(value.liquidityDetails))
    }
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/user-liquidity-details?self=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>liqpoollist(value.liquidityDetails))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/user-liquidity-details?self=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>liqpoollist(value.liquidityDetails))
    }
    return(
        <>
        <Navbar/>
        <div>
            <div className="m-4 flex justify-center items-center bg-gray-400">
                <div className="flex justify-center items-center">
                    <div className="m-2">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input type="text" name="username" value={searchLiq.username} onChange={(e)=>setSearchLiq({...searchLiq,"username":e.target.value})} className="border rounded-md ml-2"/>
                    </div>
                    <div className="m-2">
                        <label className="control-label">Status</label>
                        <select name="status" id="status" onChange={(e)=>setSearchLiq({...searchLiq,"status":e.target.value})} className="border rounded-md ml-2">
                            <option defaultValue value="">All</option>
                            <option value="1">Unblocked</option>
                            <option value="0">Blocked</option>
                        </select>
                    </div>
                    <div className="m-2">
                        <label className="control-label">&nbsp;</label>
                        <button type="submit" onClick={liqpoolSearch} className="border rounded-md px-5 py-2 bg-slate-500" name="search">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <span className="ml-4">Liquidity Details</span>
            {liqpoollist&&<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Total Bonus
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid Bonus
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bonus Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (()=>{
                            if(liqpoollist){
                                let table = []
                                for(let d of liqpoollist.data){
                                    table.push(
                                        <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                $ {parseInt(d.total_amount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                $ {parseInt(d.paid_bonus)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.bonus_date}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.status?"active":"inactive"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.created_at}
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
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{liqpoollist.from}-{liqpoollist.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{liqpoollist.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(liqpoollist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{liqpoollist.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(liqpoollist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>}
        </div>
        </>
    )
}