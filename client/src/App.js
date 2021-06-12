import React from 'react'

import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import {loadUser} from './js/actions/authAction'
import setAuthToken from './js/utils/setAuthToken';
import { useEffect } from 'react';
import store from "./js/store"
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './js/reducers/post';



if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser()) 
   
  },[])
  return (
   
    <div className="App">
     
      <Router>
      <Navbar/>
      < Route exact  path='/' component={Landing}/>
      <section className='container'>
        <Alert/>
        <Switch>
        <Route  exact path='/login' component={Login}/>
        <Route exact path='/register' component ={Register}/>
        <Route exact path='/profiles' component ={Profiles}/>
        <Route exact path='/profile/:id' component ={Profile}/>
        <PrivateRoute exact path='/dashboard' component ={Dashboard}/>
        <PrivateRoute exact path='/create-profile' component ={CreateProfile}/>
        <PrivateRoute exact path='/edit-profile' component ={EditProfile}/>
        <PrivateRoute exact path='/add-experience' component ={AddExperience}/>
        <PrivateRoute exact path='/add-education' component ={AddEducation}/>
        <PrivateRoute exact path='/posts' component ={Posts}/>
        <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
      
      </section>
    </Router>
    
    </div>
   

  );

}

export default App;

