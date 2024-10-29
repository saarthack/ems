import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const submitHandler=(e)=> {
        e.preventDefault()
        // console.log("Form Submitted")
        // console.log(email, password)
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='border-2 border-emerald-600 p-20 rounded-xl'>
                <form onSubmit={(e)=>{
                    submitHandler(e)
                }} className='flex flex-col items-center justify-center'>
                    <input 
                    value={email}
                    onChange={(e)=>{
                        // console.log(e.target.value)
                        setEmail(e.target.value)
                    }} 
                    required 
                    className='border-2 border-emerald-600 text-xl outline-none bg-transparent placeholder:text-gray-400 py-3 px-5 rounded-full ' type="email" placeholder='example@ems.com' 
                    />
                    <input 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} 
                    required 
                    className='border-2 border-emerald-600 text-xl outline-none bg-transparent mt-3 placeholder:text-gray-400 py-3 px-5 rounded-full ' type="password" placeholder='enter your password' 
                    />
                    <button className='border-none mt-5 bg-emerald-600 text-xl  outline-none  placeholder: py-3 px-5 rounded-full'>Log in</button>
                </form>
            </div>      
        </div>
    )
}
 
export default Login
