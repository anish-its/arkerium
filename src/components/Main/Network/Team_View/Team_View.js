import React,{useState,useEffect} from "react";
import Navbar from "../../Navbar/Navbar";

export default function Team_View(){
    const [teamlist,setTeamlist] = useState();
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/network/team-view',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{setTeamlist(value.users)})
    },[])
    function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/network/team-view?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTeamlist(value.users))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/network/team-view?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setTeamlist(value.users))
    }
    return(
        <>
        <Navbar/>
        <div>
            <span className="ml-4">Team View</span>
            <div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sponsor Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Joining Level
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Active Package
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Upline (Position)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Registration Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Activation Date
                            </th>
                        </tr>
                    </thead>
                    {teamlist&&<tbody>
                    {
                        (()=>{
                            let table = []
                            for(let d of teamlist.data){
                                table.push(
                                    <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {d.user_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.sponsor_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.level}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.leg_position}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.package_name || "Not Available"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.parent_name}({d.leg_position})
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.created_at}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.activation_date || "Not Yet"}
                                        </td>
                                    </tr>
                                )
                            }
                            return table;
                        })()
                    }
                    </tbody>}
                </table>
                {teamlist&&<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{teamlist.from}-{teamlist.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{teamlist.total}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <span onClick={()=>listLoadPrev(teamlist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{teamlist.current_page}</span>
                        </li>
                        <li>
                            <span onClick={()=>listLoadNext(teamlist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                        </li>
                    </ul>
                </nav>}
            </div>
        </div>
        </>
    )
}