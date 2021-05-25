import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from "../../App"
const Profile=()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const[image,setImage]=useState("")
    const[url,setUrl]=useState()

    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{
                
                setPics(result.mypost)
            })   
    },[])

    useEffect(()=>{
        if(image){
            const data= new FormData()
            data.append("file",image)
            data.append("upload_preset","insta_clone")
            data.append("cloud_name","pranjaliinsta")
            fetch("	https://api.cloudinary.com/v1_1/pranjaliinsta/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                setUrl(data.url)
                localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                dispatch({
                    type:"UPDATEPIC",
                    payload:data.url
                })
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        }

    },[image])
    const uploadPhoto=(file)=>{
        setImage(file) 
    }
    return(
        <div style={{
            maxWidth:"650px",margin:"0px auto"
        }}>
            <div style={{
                margin:"18px 10px",
                borderBottom:"1px solid grey"
            }} >
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                
            }}>
                <div>
                    <img style={{width:"180px",height:"180px",borderRadius:"90px",margin:"15px 20px"}}
                    src={state?state.pic:"Loading..."}
                    />
                    

                </div>
                <div>
                    <h4>{state?state.name:"Loading..."}</h4>
                    <h5>{state?state.email:"Loading..."}</h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width: "108% "
                    }}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length : "0"} Followers</h6>
                        <h6>{state?state.following.length : "0"} Following</h6>
                    </div>
                    
                </div>
            </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn waves-effect waves-light #1e88e5 blue darken-1">
                    <span>Update pic</span>
                    <input type="file" onChange={(e)=>uploadPhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>
                </div>
        <div className="gallery">
            {
                mypics.map(item=>{
                    return (
                        <img key={item._id} className="item" src={item.photo} alt={item.title} />

                    )
                })
            }
            
        </div>
        </div>
    )


}
export default Profile