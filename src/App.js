import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './store/PostContext';

import Home from './Pages/Home';
import './App.css';
import Login from './Pages/Login';
import Create from './Components/Create/Create';
import View from './Components/View/View';

/**
 * ===== Import Components =====
 */

function App() {
  const {user,setUser}=useContext(AuthContext)
  const {firebaseApp}=useContext(FirebaseContext)
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

      <Post>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </Router>
      </Post>

    </div>
  );
}

export default App;
