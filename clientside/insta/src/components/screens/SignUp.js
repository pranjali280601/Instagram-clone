import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignUp=()=>{
    const history=useHistory()
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const[image,setImage]=useState("")
    const[url,setUrl]=useState(undefined)

    useEffect(()=>{
        if(url)
        uploadFields()

    },[url])

    
const uploadProfilePic=()=>{
    const data= new FormData()
    data.append("file",image)
    data.append("upload_preset","insta_clone")
    data.append("cloud_name","pranjaliinsta")
    fetch("	https://api.cloudinary.com/v1_1/pranjaliinsta/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data=>{
        setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
    
}

    const uploadFields=()=>{
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
                password,
                pic:url
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
    const PostData=()=>{
        if(image){
            uploadProfilePic()
            
        }
         else{
            uploadFields()
         }
           
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
                <div className="file-field input-field">
                <div className="btn waves-effect waves-light #1e88e5 blue darken-1">
                    <span>Upload Profile pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>
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