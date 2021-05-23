import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  const renderList=()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li>
        <button className="btn waves-effect waves-light #1e88e5 blue darken-1"
        onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin')
        }}>
            Logout
        </button>
        </li>
      ]
    }else{
      return [<li><Link to="/signin">Login</Link></li>,
      <li><Link to="/signup">SignUp</Link></li>
    ]

    }
    }
  
  
    return (
      
        <nav>
        <div className="nav-wrapper white">
          <div style={{
        maxWidth:"850px",margin:"0px auto" }}>
          <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
            </ul>
        </div>
        </div>
      </nav>
      
    )
}
export default NavBar;