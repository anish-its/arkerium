import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';

export default function Transfer(){
    const [depositBalance,setDepositBalance] = useState("");
    const [tranFrom,setTranForm] = useState({"wallet":"","username":"","amount":""});
    const [transbal,setTransbal] = useState();
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/manual-deposit',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setDepositBalance(value.data.depositBalance)})
    },[])
    useEffect(() => {
		fetch('https://dev.arkmnetwork.com/api/app/wallet/transfer', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`,
			},
			method: 'GET',
		})
		.then((value) => value.json())
		.then((value) => setTransbal(value.transfers))
	}, [])
    function tranBtn(){
        fetch('https://dev.arkmnetwork.com/api/app/wallet/transfer', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`,
			},
			method: 'POST',
            body:JSON.stringify(tranFrom)
		})
        .then((value) => value.json())
        .then((value) => {console.log(value)})
    }
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/wallet/transfer?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTransbal(value.transfers))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/wallet/transfer?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTransbal(value.transfers))
    }
    return(
        <>
        <Navbar/>
        <span className='font-bold text-xl pl-3 pt-3'>Transfer Balance</span>
        {depositBalance&&<div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">Deposit Wallet Balance</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">USD : {parseFloat(depositBalance)}</p>
        </div>}
        <div className="flex flex-col justify-center items-center bg-slate-500 m-3 p-3 rounded gap-3">
            <div className="flex flex-wrap p-3 gap-3">
                <div className="flex flex-col">
                    <label htmlFor="username">Wallet: </label>
                    <select name="wallet" className="" onChange={(e)=>setTranForm({...tranFrom,'wallet':e.target.value})}>
                        <option value="">- Select Wallet -</option>
                        <option value="deposit_to_deposit">Deposit wallet to Deposit Wallet</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="username">Payee Username: <span name="display_user"></span></label>
                    <input className="form-control" value={tranFrom.username} onChange={(e)=>setTranForm({...tranFrom,'username':e.target.value})} type="text" name="username" placeholder="Enter payee username"/>
                    <p className="help-block"></p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="amount">Amount: </label>
                    <input id="money" className="form-control" type="text" name="amount" placeholder="Enter amount to transfer"  value={tranFrom.amount} onChange={(e)=>setTranForm({...tranFrom,'amount':e.target.value})}/>
                    <p className="help-block"></p>
                </div>
            </div>
            <div className="">
                <button className="bg-blue-600 p-2 rounded" onClick={tranBtn}>Proceed</button>
            </div>
        </div>
        <div>
            <span className="ml-4">Your Earlier Transfers</span>
            <div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                # ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payee
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount Sent
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount Received
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Source Wallet
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Receiving Wallet
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    {transbal&&<tbody>
                    {
                        (()=>{
                            if(transbal){
                                let table = []
                                for(let d of transbal.data){
                                    table.push(
                                        <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                {d.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.Payee}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.amount_sent}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.amount_received}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.source_wallet}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.receiving_wallet}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.date}
                                            </td>
                                        </tr>
                                    )
                                }
                                return table;
                            }
                        })()
                    }
                    </tbody>}
                </table>
                {transbal&&<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{transbal.from}-{transbal.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{transbal.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(transbal.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{transbal.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(transbal.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>}
            </div>
        </div>
        </>
    )
}