import React, { useState,useEffect } from "react";
import Navbar from "../../Navbar/Navbar";

export default function Pyp(){
    const [packs,setPacks] = useState();
    const [pyplist,setPyplist] = useState();
    const [buypyp,setBuypyp] = useState({"investment_amount":"","username":"","currency1":""});
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/subscription',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setPacks(value);setPyplist(value.subcriptions)})
    },[])
    function sendpyp(){
        fetch('https://dev.arkmnetwork.com/api/app/subscription/store',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(buypyp),
        })
        .then((value)=>value.json())
        .then((value)=>{console.log(value)})
    }
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/subscription?self=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setPyplist(value.subcriptions)})
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/subscription?self=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setPyplist(value.subcriptions)})
    }
    return(
        <>
        <Navbar/>
        {packs&&<div className="p-5 grid grid-cols-4">
            {
                (()=>{
                    const card = [];
                    for(let d of packs.packages)
                    {
                        card.push(
                        <div key={d.id} className="block max-w-full p-6 m-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{d.name}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">ROI : {d.daily_return_percentage} %</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Total Limit : {d.total_limit_percentage} %</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">ROI Limit : {d.roi_limit_percentage} %</p>
                        </div>
                        )
                    }
                    return card
                })()
            }
        </div>}
        <div className="m-6 p-3 rounded-md bg-slate-300">
            {packs&&<span>Your Active Package Name : {packs.active_package}</span>}
            <div className="mb-6">
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-white dark:text-black">Username :</label>
                <input type="text" placeholder="Enter Username" name="username" id="large-input" onChange={(e)=>setBuypyp({...buypyp,"username":e.target.value})} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-6">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-white dark:text-black">Enter Amount :</label>
                <input type="text" placeholder="Enter Amount In USD" name="investment_amount" id="base-input" onChange={(e)=>setBuypyp({...buypyp,"investment_amount":e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div>
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white dark:text-black">Payment Method :</label>
                <select name="currency1" id="currency1" onChange={(e)=>setBuypyp({...buypyp,"currency1":e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue>Select Payment Method</option>
                    <option value="deposit">Deposit Wallet ( $4611138)</option>
				</select>
            </div>
            <div>
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white dark:text-black">Subscription Type :</label>
                <select name="currency1" id="currency1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option  defaultValue>Select Subscription Type</option>
                    <option value="1">Default</option>
				    <option  value="2">ROI ONLY</option>
				</select>
            </div>
            <div className="flex flex-col p-3">
                <button type="button" onClick={sendpyp} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Active</button>
            </div>
        </div>
        
        <div>
            <span className="ml-4">Your Package Activation History</span>
            {packs&&<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subscription done By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Package Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Income Limit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid Total Income
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total ROI Income Limit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid ROI Income
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Activation Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (()=>{
                            if(packs){
                                let table = []
                                for(let d of pyplist.data){
                                    table.push(
                                        <tr key={d.invoice_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                {d.invoice_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.sub_user}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.subdoneby_user}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.transaction_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.price} USD
                                            </td>
                                            <td className="px-6 py-4">
                                                USD {parseInt(d.total_income_limit)}
                                            </td>
                                            <td className="px-6 py-4">
                                                USD {parseInt(d.total_paid_income).toPrecision(3)}
                                            </td>
                                            <td className="px-6 py-4">
                                                USD {parseInt(d.total_roi_income_limit)}
                                            </td>
                                            <td className="px-6 py-4">
                                                USD {parseInt(d.paid_roi_income).toPrecision(3)}
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
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{pyplist.from}-{pyplist.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{pyplist.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(pyplist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pyplist.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(pyplist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>}
        </div>
        </>
    )
}