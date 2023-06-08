import React, { useState,useRef } from 'react';
import { useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const emailRef=useRef(null)
  const passwordRef=useRef(null)
  const navigate=useNavigate()

  const{firebaseApp}=useContext(FirebaseContext) 
  const auth = getAuth(firebaseApp);

  const handlelogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            ref={emailRef}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            ref={passwordRef}
            
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
