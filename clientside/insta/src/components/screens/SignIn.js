import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'
const SignIn=()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
   
    const PostData=()=>{
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
          return M.toast({html: "Invalid email",classes:"#f44336 red"})
        }
        
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
            
                email,
                password
            })
            
        }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html: "Signed in successfully", classes:"#4caf50 green"})
                    history.push('/')
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
                    LOGIN
                </button>
                <h5 style={{fontSize:"15px",fontFamily: 'Roboto Mono'}}>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </h5>
            </div>
        </div>
        
    )


}
export default SignIn