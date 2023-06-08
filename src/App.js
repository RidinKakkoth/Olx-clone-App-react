import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from './Pages/Home';
import './App.css';
import Login from './Pages/Login';

/**
 * ===== Import Components =====
 */

function App() {
  const {user,setUser}=useContext(AuthContext)
  // const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user)
        
        
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
