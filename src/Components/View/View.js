import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from "firebase/firestore";
import { PostContext } from '../../store/PostContext';
// import { firestore } from '../../firebase/config';


function View() {

  const[userDetails,setUserDetails]=useState("")
  const {postDetails}=useContext(PostContext)  //post details including user id passed through context
  const {firestore}=useContext(FirebaseContext)

  useEffect(()=>{


    //get user details to show in seller details of product using user id ref

    const fetchData = async () => {
      if (postDetails?.userId) {
        const { userId } = postDetails;
        const queryDetails = query(collection(firestore, "user"), where("id", "==", userId));
        const querySnapshot = await getDocs(queryDetails);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      }
    };
    
console.log("hiiiiiiiiiiiiiiiiii");
    fetchData();
  },[])

  return (

    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?postDetails.imageUrl:""}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?postDetails.price:""} </p>
          <span>{postDetails?postDetails.name:""}</span>
          <p>{postDetails?postDetails.category:""}</p>
          <span>{postDetails?postDetails.createdAt:""}</span>
        </div>
        {userDetails&& <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
