import React,{useState,useEffect} from "react";
import Navbar from "../../Navbar/Navbar";

export default function Transactions(){
    const [translist,setTranslist] = useState();
    const [searchtran,setSearchTran] = useState({"type":"","encashment":""});
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/report/comission',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTranslist(value.incomes)})
    },[])
    function transSearch(){
        fetch(`https://dev.arkmnetwork.com/api/app/report/comission?type=${searchtran.type}&encashment=${searchtran.encashment}&search=true`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTranslist(value.incomes);console.log(value)})
    }
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/report/comission?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTranslist(value.incomes))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/report/comission?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTranslist(value.incomes))
    }
    return (
        <>
        <Navbar/>
        <div>
            <div className="m-4 flex justify-center items-center bg-gray-400">
                <div className="flex justify-center items-center">
                    <div className="m-2">
                        <label className="control-label">Type</label>
                        <select name="type" id="type" onChange={(e)=>setSearchTran({...searchtran,"type":e.target.value})} className="border rounded-md ml-2">
							<option value="" defaultValue>All</option>
                            <option value="ROI">SOI REWARD</option>
                            <option value="SPONSOR">REFERRAL REWARD</option>
                            <option value="BINARY">MATCHING REWARD</option>
                            <option value="KICK STARTER">KICK START REWARD</option>
                            <option value="LIQUIDITY POOL">LIQUIDITY POOL REWARD</option>
                            <option value="GAMING">GAMING REWARD</option>
                        </select>
                    </div>
                    <div className="m-2">
                        <label className="control-label">Status</label>
                        <select name="encashment" id="encashment" onChange={(e)=>setSearchTran({...searchtran,"encashment":e.target.value})} className="border rounded-md ml-2">
                            <option defaultValue value="">All</option>
                            <option value="1">Paid</option>
                            <option value="0">Unpaid</option>
                        </select>
                    </div>
                    <div className="m-2">
                        <label className="control-label">&nbsp;</label>
                        <button type="submit" onClick={transSearch} className="border rounded-md px-5 py-2 bg-slate-500" name="search">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <span className="ml-4">Transactions Details</span>
            {translist&&<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Source
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
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
                                                {d.created_at.split(' ')[0]}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.source}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                {parseFloat(d.amount).toPrecision(4)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {d.encashment?"Paid":"Unpaid"}
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