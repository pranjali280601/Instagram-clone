import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignUp from './components/screens/SignUp'
import Profile from './components/screens/Profile'
import SignIn from './components/screens/SignIn'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import {reducer,initialState } from './reducers/userReducer'

export const UserContext=createContext()

const Routing=()=>{

  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      history.push("/signin")
    }
    

  },[])

  return (
      <Switch>
      <Route exact path="/signin">
      <SignIn />
      </Route>
      <Route exact path="/profile">
      <Profile />
      </Route>
      <Route exact path="/signup">
      <SignUp />
      </Route>
      <Route exact path="/createpost">
      <CreatePost />
      </Route>
      <Route exact path="/profile/:userid">
      <UserProfile />
      </Route>
      <Route exact path="/">
      <Home />
      </Route>
      </Switch>

  )
}



function App() {
  const [state,dispatch]= useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
