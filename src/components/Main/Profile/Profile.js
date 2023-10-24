import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Profile(){
    const imgRef = useRef(null);
    const [img,setImg] = useState('');
    const [gdata,setGdata] = useState();
    const [twofa,setTwofa] = useState({"secret":"","spassword":""});
    const [prover,setProver] = useState({"emailVerify":"1","withdrawalVerify":"1","transfer":"1"});
    const [passdata,setPassdata] = useState({"old_password":"","password":"","password_confirmation":""})
    const [spassdata,setSpassdata] = useState({"old_password":"","spassword":"","spassword_confirmation":""})
    const [pdata,setPdata] = useState({'username':'','firstname':'','middlename':'','lastname':'','email':'','country':'','phone':'','address':'',
        'city':'','state':'','pincode':'','spassword':''})
    useEffect(()=>{
        fetch('https://dev.arkmnetwork.com/api/app/profile',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'GET',
        })
        .then((value)=>value.json())
        .then((value)=>{
            setGdata(value);
            setPdata({'username':value.user.username,'firstname':value.user.first_name,'middlename':value.user.middle_name||'',
            'lastname':value.user.last_name,'email':value.user.email,'country':value.all_country[68].name,'phone':value.user.profile.mobile_no,'address':value.user.profile.address,
            'city':value.user.profile.city,'state':value.user.profile.state,'pincode':value.user.profile.pin_code,'spassword':''});
        })
    },[])
    function onChangeAvater(e){
        var fileReader = new FileReader();
        fileReader.onload = function(data) {
            var srcData = data.target.result;
            setImg(srcData);
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }
    function changeavater(e){
        let data = JSON.stringify({"profile_pic":img})
        fetch('https://dev.arkmnetwork.com/api/app_profile/admin/change-picture',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:data,
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    function pupdate(e){
        e.preventDefault();
        // let formData = new FormData();
        // for(let i in pdata)
        // {
        //     formData.append(i,pdata[i]);
        // }
        fetch('https://dev.arkmnetwork.com/api/app_profile/admin/change-personal-information',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(pdata),
            //body:formData,
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    function passdataupdate(e){
        e.preventDefault();
        let data = passdata;
        delete data['password_confirmation'];
        fetch('https://dev.arkmnetwork.com/api/app_profile/admin/change-password',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(data),
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    function secpassdataupdate(e){
        e.preventDefault();
        fetch('https://dev.arkmnetwork.com/api/app_profile/admin/change-secondary-password',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(spassdata),
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    function saveTwofa(e){
        e.preventDefault();
        fetch('https://dev.arkmnetwork.com/api/app_profile/admin/change-2fa',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(twofa),
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    function profSelectChange(e){
        let x = {}
        x[e.target.name] = e.target.value;
        setProver({...prover,...x})
    }
    function profileVerification(e){
        e.preventDefault();
        fetch('https://dev.arkmnetwork.com/api/app_profile/admin/verification',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`,
            },
            method:'POST',
            body:JSON.stringify(prover),
        })
        .then((value)=>value.json())
        .then((value)=>console.log(value))
    }
    return(
        <>
        <Navbar/>
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Profile Image
                    </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    {gdata&&<div className="sm:divide-y sm:divide-gray-200">
                        <img src={'https://dev.arkmnetwork.com/en/avatars/'+gdata.user.profile.avatar} alt='not_found'></img>
                        <label htmlFor="myfile">Chanage Image: </label>
                        <input ref={imgRef} onChange={onChangeAvater} type="file" id="myfile" name="myfile" accept="image/png, image/jpeg"/>
                        <div className="float-right">
                            <button type="button" onClick={changeavater} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change Avater</button>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Username
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'username':e.target.value})}} value={pdata.username}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            First Name
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'firstname':e.target.value})}} value={pdata.firstname} />
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Middle Name
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'middlename':e.target.value})}} value={pdata.middlename||''}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Last Name
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'lastname':e.target.value})}} value={pdata.lastname}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Email address
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'email':e.target.value})}} value={pdata.email}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Select Country
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'country':e.target.value})}} value={pdata.country}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Phone number
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'phone':e.target.value})}} value={pdata.phone}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Address
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'address':e.target.value})}} value={pdata.address}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            City
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'city':e.target.value})}} value={pdata.city}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            State
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'state':e.target.value})}} value={pdata.state}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            pin code
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'pincode':e.target.value})}} value={pdata.pincode}/>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-500">
                            Your Secondary Password
                        </div>
                        <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPdata({...pdata,'spassword':e.target.value})}} value={pdata.spassword}/>
                    </div>
                </div>
                <div className="float-right">
                    <button type="button" onClick={pupdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Changes</button>
				</div>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Security Password Setting
                </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        Current Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPassdata({...passdata,'old_password':e.target.value})}} value={passdata.old_password}/>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        New Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPassdata({...passdata,'password':e.target.value})}} value={passdata.password}/>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        Re-type New Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPassdata({...passdata,'password_confirmation':e.target.value})}} value={passdata.password_confirmation}/>
                </div>
                <div className="float-right">
                    <button type="button" onClick={passdataupdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change Password</button>
				</div>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Google 2FA Setting
                </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className="border border-gray-200 px-4 py-5 sm:p-0">
                    {gdata&&
                        <div className='flex flex-col'>
                            <img className="w-36 h-36" src={gdata.user.profile.two_factor_image_url} alt='not_found'></img>
                            <span className="text-sm font-medium text-gray-500">
                                {gdata.user.profile.two_fa_code}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                                status: {gdata.user.profile.two_fa_status?'active':'inactive'}
                            </span>
                        </div>
                    }
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        Enter 2FA Code
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setTwofa({...twofa,'secret':e.target.value})}} value={twofa.secret}/>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                    Your Secondary Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setPassdata({...twofa,'spassword':e.target.value})}} value={twofa.spassword}/>
                </div>
                <div className="float-right">
                    <button type="button" onClick={saveTwofa} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Enable</button>
				</div>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Secondary Password
                </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        Primary Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setSpassdata({...spassdata,'old_password':e.target.value})}} value={spassdata.old_password}/>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        New Secondary Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setSpassdata({...spassdata,'spassword':e.target.value})}} value={spassdata.spassword}/>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                        Re-type New Secondary Password
                    </div>
                    <input type='text' className="border rounded-md p-2 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" onChange={(e)=>{setSpassdata({...spassdata,'spassword_confirmation':e.target.value})}} value={spassdata.spassword_confirmation}/>
                </div>
                <div className="float-right">
                    <button type="button" onClick={secpassdataupdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change Secondary Password</button>
				</div>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Verification
                </h3>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                    Email Activation
                </div>
                <select name='emailVerify' onChange={profSelectChange} id="emailVerify" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={1} defaultValue>Active</option>
                    <option value={0}>Inactive</option>
                </select>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                    Withdrawal Status
                </div>
                <select name='withdrawalVerify' onChange={profSelectChange} id="withdrawalVerify" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={1} defaultValue>Active</option>
                    <option value={0}>Inactive</option>
                </select>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                    Transfer Status
                </div>
                <select name='transfer' onChange={profSelectChange} id="transfer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={1} defaultValue>Active</option>
                    <option value={0}>Inactive</option>
                </select>
            </div>
            <div className="float-right">
                <button type="button" onClick={profileVerification} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Change</button>
            </div>
        </div>
        </>
    )
}