import React,{useState,useEffect} from 'react';
import Navbar from "../../Navbar/Navbar";

export default function Deposit(){
    const [transdata,setTransdata] = useState();
    const [arkmData,setArkmData] = useState({"transaction_id":"","comment":""});
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/manual-deposit',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTransdata(value.data))
    },[])
    function depositbtn(e){
        e.preventDefault();
        fetch('https://dev.arkmnetwork.com/api/app/deposit',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(arkmData),
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/deposit?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTransdata(value.data))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/deposit?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTransdata(value.data))
    }
    return(
        <>
        <Navbar/>
        <span>ARKM Deposit</span>
        {transdata&&<div className="block m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-slate-300 dark:border-gray-500 dark:hover:bg-gray-500">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">Deposit Wallet</h5>
            <p className="font-normal text-gray-700 dark:text-gray-500">Balance : {parseFloat(transdata.depositBalance)}</p>
        </div>}
        {transdata&&<div className="flex flex-col justify-center items-center m-3 max-w-full text-center p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-slate-500 dark:border-gray-600">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-black">ARKM Deposit (1 Token = $ {parseFloat(transdata.token_price).toPrecision(6)})</h5>
            <p className="font-normal text-gray-700 dark:text-gray-100">Network : TRC20 (<a href={`https://tronscan.org/#/contract/${transdata.coinAddress}`}>View</a>)</p>
            <img className="text-center" src="https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=TQXKHys7oRZHG9aEzywvTNev35g18vfQLQ"></img>
            <p className="font-normal text-gray-700 dark:text-gray-100">{transdata.coinAddress}</p>
        </div>}
        <div className="flex flex-col m-3 p-6 rounded-md border bg-slate-400 gap-3">
			<h3 class="font-normal text-gray-100 dark:text-gray-900">Generate ARKM Deposit Request</h3><hr/>
            <div class="form-group">
                <label class="font-normal text-gray-100 dark:text-gray-900" for="transaction_id">TNX ID * : </label>	
                <input type="text" class="rounded-md border p-2" name="transaction_id" placeholder="Enter transaction id" onChange={(e)=>setArkmData({...arkmData,"transaction_id":e.target.value})} value={arkmData.transaction_id}/>
            </div>
            <div class="form-group">
                <label class="font-normal text-gray-100 dark:text-gray-900" for="from_address">Comment : </label>	
                <input type="text" class="rounded-md border p-2" name="comment" placeholder="Enter comment" onChange={(e)=>setArkmData({...arkmData,"comment":e.target.value})} value={arkmData.comment}/>
            </div>
			<button type="submit" onClick={depositbtn} class="border rounded-md bg-blue-700">Submit</button>
		</div>
        <div>
            <span className="ml-4">ARKM Deposit List</span>
            <div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Referance No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Token Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Received Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remarks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View
                            </th>
                        </tr>
                    </thead>
                    {transdata&&<tbody>
                    {
                        (()=>{
                            if(transdata){
                                let table = []
                                for(let d of transdata.depositRequest.data){
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
                    </tbody>}
                </table>
                {transdata&&<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{transdata.depositRequest.from}-{transdata.depositRequest.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{transdata.depositRequest.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(transdata.depositRequest.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{transdata.depositRequest.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(transdata.depositRequest.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>}
            </div>
        </div>
        </>
    )
}
