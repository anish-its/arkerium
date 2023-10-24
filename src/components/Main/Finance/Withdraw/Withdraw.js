import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbar/Navbar";

export default function Withdraw() {
	const [withdrawData, setWithdrawdata] = useState();
	const [withdrawCut, setWithdrawCut] = useState({ "Liquidity_Amount": 15, "Gaming_Amount": 5 })
	const [withdrawCash, setWithDrawCash] = useState({ "cwallet": "", "camount": "", "withdraw_type": "", "email_otp": "" });
	const [withdrawGame, setWithDrawGame] = useState({ "camountt": "","email_otpp": "" });
	const [withdrawlist,setWithdrawlist] = useState();
	useEffect(() => {
		fetch('https://dev.arkmnetwork.com/api/app/wallet/withdraw', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`,
			},
			method: 'GET',
		})
			.then((value) => value.json())
			.then((value) => { 
				setWithdrawdata(value);
				setWithdrawlist(value.withdraws);})
	}, [])
	function withdrawBtn(e) {
		e.preventDefault();
		fetch('https://dev.arkmnetwork.com/api/app/wallet/withdraw/cash', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`,
			},
			method: 'POST',
			body: JSON.stringify(withdrawCash),
		})
			.then((value) => value.json())
			.then((value) => { console.log(value) })
	}
	function gameWithdrawBtn(e){
		e.preventDefault();
		fetch('https://dev.arkmnetwork.com/api/app/wallet/withdraw/game', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`,
			},
			method: 'POST',
			body: JSON.stringify(withdrawGame),
		})
		.then((value) => value.json())
		.then((value) => { console.log(value) })
	}
	function withdrawOTP() {
		fetch('https://dev.arkmnetwork.com/api/app/profile/send-otp', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`,
			},
			method: 'GET',
		})
		.then((value) => value.json())
		.then((value) => { console.log(value) })
	}
	function listLoadPrev(num){
        fetch(`https://dev.arkmnetwork.com/api/app/wallet/withdraw?page=${parseInt(num)-1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setWithdrawlist(value.withdraws.data))
    }
    function listLoadNext(num){
        fetch(`https://dev.arkmnetwork.com/api/app/wallet/withdraw?page=${parseInt(num)+1}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>setWithdrawlist(value.withdraws.data))
    }
	return (
		<>
			<Navbar />
			{withdrawData && <div className='flex p-3 flex-wrap gap-2'>
				<div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">WITHDRAW WALLET</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">${parseFloat(withdrawData.withdraw_balance)}</p>
				</div>
				<div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TOKEN WALLET</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">${parseFloat(withdrawData.token_balance)}</p>
				</div>
				<div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">CURRENT PRICE</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">${parseFloat(withdrawData.tokenPrice)}</p>
				</div>
			</div>}
			<div className="m-4 p-2 bg-slate-400 border rounded-md">
				<div className="">
					<h3 className='font-bold'>Withdrawal Rules :-</h3>
				</div>
				<div className="flex flex-col gap-1">
					<p>Minimum withdraw amount is $20</p>
					<p>Withdrawable amount will be credited in Account Address :  </p>
					<p>All withdrawals will be processed within 24 hours.</p>
					<p className=""><strong>Liquidity Pool Amount 15%</strong></p>
					<p>15% of amount will be deducted from every Withdraw </p>

					<p className=""><strong>Gaming Amount 5%</strong></p>
					<p>5% of amount will be deducted from every Withdraw </p>

				</div>
			</div>
			{
				withdrawData && <div className="m-4 p-2 bg-slate-400 border rounded-md">
					<div className="alert alert-danger text-center"> Withdraw in your crunex exchange Account. </div>
					<div className="flex flex-col gap-2">
						<div className="">
							<div className="form-group has-feedback">
								<label>Wallet : </label>
								<select name="cwallet" className="border rounded-md" onChange={(e) => setWithDrawCash({ ...withdrawCash, "cwallet": e.target.value })}>
									<option value="" defaultValue>Select wallet type</option>
									<option value="withdraw">Withdraw wallet</option>
									<option value="token">Token wallet</option>
								</select>
							</div>
						</div>
						<div className="">
							<label>Amount ($) : </label>
							<input id="money" className="border rounded-md" type="text" name="camount" placeholder="Enter amount to withdraw" onChange={(e) => setWithDrawCash({ ...withdrawCash, "camount": e.target.value })} />
						</div>
						<div className="col-md-12">
							<div className="form-group has-feedback">
								<label>Withdraw Type : </label>
								<select name="withdraw_type" className="border rounded-md" onChange={(e) => setWithDrawCash({ ...withdrawCash, "withdraw_type": e.target.value })}>
									<option value="" defaultValue>Select withdraw type</option>
									<option value="withdraw_to_crunex">Withdraw To Crunex wallet</option>
									<option value="withdraw_to_deposit">Withdraw To ARKM Deposit wallet</option>
								</select>
								<p className="help-block text-danger"></p>
							</div>
						</div>
						<div className="">
							<div className="flex gap-3">
								<label>One Time Password : </label>
								<input type="text" name="email_otp" className="border rounded-md" placeholder="Enter One Time Password" onChange={(e) => setWithDrawCash({ ...withdrawCash, "email_otp": e.target.value })} />
								<span className='font-semibold cursor-pointer' onClick={withdrawOTP}>Click Here To Receive OTP On Your Email</span>
							</div>
						</div>
						<div className="mt-4">
							<div className="p_overfloaw">
								<p className="mb-0">Liquidity Amount :   <span className="float-right">$ <span className="liquidity_data">{(withdrawCut.Liquidity_Amount / 100) * withdrawCash.camount}</span></span></p>
								<p className="mb-0">Gaming Amount : <span className="float-right">$ <span className="gaming_data">{(withdrawCut.Gaming_Amount / 100) * withdrawCash.camount}</span></span> </p>
								<p className="mb-0">Withdraw Net Amount : <span className="float-right">$ <span className="withdrawable_usd_data">
									{withdrawCash.camount * ((100 - (parseFloat(withdrawCut.Liquidity_Amount) + parseFloat(withdrawCut.Gaming_Amount))) / 100)}
								</span></span></p>
								<p className="mb-4">Withdraw Amount : <span className="float-right">TOKEN <span className="withdrawable_data">
									{((withdrawCash.camount * ((100 - (parseFloat(withdrawCut.Liquidity_Amount) + parseFloat(withdrawCut.Gaming_Amount))) / 100)) / withdrawData.tokenPrice).toPrecision(6)}
								</span></span></p>
							</div>
						</div>
						<div className="flex justify-center">
							<button id="genpassword" className='bg-blue-600 p-2 border rounded-md' type="submit" onClick={withdrawBtn}>
								Proceed
							</button>
						</div>
					</div>
				</div>
			}
			<div className="m-3 bg-slate-400 p-2 rounded-md">
				<div className="flex justify-center items-center">
					<h3 className='font-serif'>Gaming Wallet Withdraw</h3>
				</div>
				{withdrawData&&<div className="">*Please create your account at <a href="https://arkeriagames.com" >https://arkeriagames.com</a> using <strong>{withdrawData.withdraws.data[0].address}</strong> before making withdraw else you may lose your balance.</div>}
				<div className="flex w-full">
					<div className="flex flex-col gap-2 w-full">
						<div className="flex">
							<label>Amount ($) : </label>
							<input id="money" className="rounded-md p-1" type="text" name="camountt" placeholder="Enter amount to withdraw" value={withdrawGame.camountt} onChange={(e)=>setWithDrawGame({...withdrawGame,"camountt":e.target.value})}/>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<label>One Time Password : </label>
							<input type="text" name="email_otpp" className="rounded-md p-1" placeholder="Enter One Time Password" value={withdrawGame.camountt} onChange={(e)=>setWithDrawGame({...withdrawGame,"email_otpp":e.target.value})}/>
							<span className='font-semibold cursor-pointer' onClick={withdrawOTP}>Click Here To Receive OTP On Your Email</span>
						</div>
						<div className="flex justify-center">
							<button id="genpassword" onClick={gameWithdrawBtn} className="bg-blue-600 p-2 rounded-md" type="submit">
								Proceed
							</button>
						</div>
					</div>
				</div>
			</div>
			<div>
            	<span className="ml-4">Your Earlier Withdrawal Requests</span>
            	<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Amount
								</th>
								<th scope="col" className="px-6 py-3">
									Receivable Amount
								</th>
								<th scope="col" className="px-6 py-3">
									Method
								</th>
								<th scope="col" className="px-6 py-3">
									Token Price
								</th>
								<th scope="col" className="px-6 py-3">
									Amount Receivable
								</th>
								<th scope="col" className="px-6 py-3">
									Account
								</th>
								<th scope="col" className="px-6 py-3">
									Tx ID
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
							</tr>
						</thead>
						{withdrawlist&&<tbody>
						{
							(()=>{
								if(withdrawlist){
									let table = []
									for(let d of withdrawlist.data){
										table.push(
											<tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
												<td className="px-6 py-4">
													{d.created_at}
												</td>
												<td className="px-6 py-4">
													{d.coin_type} {d.amount_from}
												</td>
												<td className="px-6 py-4">
													{d.coin_type} {d.amount_to}
												</td>
												<td className="px-6 py-4">
													{d.coin_type}
												</td>
												<td className="px-6 py-4">
													{d.coin_type} {d.token_price}
												</td>
												<td className="px-6 py-4">
													{d.net_amount} {d.coin_type}
												</td>
												<td className="px-6 py-4">
													{d.address}
												</td>
												<td className="px-6 py-4">
													{d.t_hash}
												</td>
												<td>
													{d.status} {d.process_at}
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
					{withdrawlist&&<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
						<span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{withdrawlist.from}-{withdrawlist.to}</span> of <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{withdrawlist.total}</span></span>
						<ul className="inline-flex -space-x-px text-sm h-8">
							<li>
								<span onClick={()=>listLoadPrev(withdrawlist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
							</li>
							<li>
								<span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{withdrawlist.current_page}</span>
							</li>
							<li>
								<span onClick={()=>listLoadNext(withdrawlist.current_page)} className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
							</li>
						</ul>
					</nav>}
            	</div>
        	</div>
		</>
	)
}