import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from "../../App"
import {useParams}  from 'react-router-dom'
const UserProfile=()=>{
    const {userid}= useParams()
    const [userProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{
                console.log("Set")
                console.log(result)
                setProfile(result)
                
            })   
    },[])
    return(
        <>
        {userProfile?
        <div style={{
            maxWidth:"650px",margin:"0px auto"
        }}>
            <div style={{

                display:"flex",
                justifyContent:"space-around",
                margin:"18px 10px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"180px",height:"180px",borderRadius:"90px",margin:"15px 20px"}}
                    src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                    />

                </div>
                <div>
                <h4>{userProfile.user.name}</h4>
                    <h4>{userProfile.user.email}</h4>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width: "60% "
                    }}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                    
                </div>
            </div>
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return (
                        <img key={item._id} className="item" src={item.photo} alt={item.title} />

                    )
                })
            }
            
        </div>
        </div>
         : <h2>Loading...</h2>}
        
        </>
    )


}
export default UserProfile