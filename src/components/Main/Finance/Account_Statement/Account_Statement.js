import React,{useState,useEffect} from "react";
import Navbar from "../../Navbar/Navbar";

export default function Account_Statement(){
    const [translist,setTranslist] = useState();
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/wallet/transaction',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTranslist(value.transactions)})
    },[])
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/wallet/transaction?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTranslist(value.transactions))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/wallet/transaction?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTranslist(value.transactions))
    }
    return(
        <>
        <Navbar/>
        <div>
            <span className="ml-4">Account Statement</span>
            {translist&&<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                # Transaction
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Source
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Wallet
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (()=>{
                            if(translist){
                                let table = []
                                for(let d of translist.data){
                                    table.push(
                                        <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                {d.code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.type}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.source}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.wallet}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.description}
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
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{translist.from}-{translist.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{translist.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(translist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{translist.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(translist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>}
        </div>
        </>
    )
}