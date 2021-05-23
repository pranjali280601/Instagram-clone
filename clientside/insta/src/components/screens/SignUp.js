
import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'



const SignUp=()=>{
    const history=useHistory()
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
   
    const PostData=()=>{
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
          return M.toast({html: "Invalid email",classes:"#f44336 red"})
        }
        
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
            
        }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    M.toast({html: data.message, classes:"#4caf50 green"})
                    history.push('/signin')
                }
            }).catch(err=>{
                console.log(err)
            })
          
        
    }
    
    return(
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>Instagram</h2>
                <input 
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1"
                onClick={()=>PostData()}>
                    Sign Up
                </button>
                <h5 style={{fontSize:"15px",fontFamily: 'Roboto Mono'}}>
                    <Link to="/signin">Already have an account? Sign In</Link>
                </h5>
            </div>
        </div>
    )


}
export default SignUp