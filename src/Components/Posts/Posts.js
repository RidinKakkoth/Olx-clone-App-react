import React,{useEffect,useContext, useState} from 'react';
import { collection, getDocs } from "firebase/firestore"; 


import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
// import PostContext from '../../store/PostContext'
import { firestore } from '../../firebase/config';
import { useNavigate } from 'react-router';
import { PostContext } from '../../store/PostContext';

function Posts() {


const[products,setProducts]=useState([])
const {firebaseApp}=useContext(FirebaseContext)
const {setPostDetail}=useContext(PostContext)
const navigate=useNavigate()

useEffect(()=>{
  
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "products"))
        const allPost=querySnapshot.docs.map((product)=>{

          return {
            ...product.data(),
          id:product.id }
        })
        setProducts(allPost)
  };

  fetchData();

},[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
{   products.map(product=>{



  return <div className="card" key={product.id}
            onClick={()=>{setPostDetail(product)
             
            navigate("/view")}}  >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="product_image" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          }
           )
        }
        </div>
      </div>
      
    </div>
  );
}

export default Posts;
