import React, { Fragment, useRef, useState} from 'react';
import { useContext } from 'react';
import { FirebaseContext,AuthContext } from '../../store/Context';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router';


const Create = () => {

  const { firebaseApp} = useContext(FirebaseContext);

  const {user}=useContext(AuthContext)


  const[image,setImage]=useState('')
  const navigate=useNavigate()

  const nameRef=useRef()
  const categoryRef=useRef()
  const priceRef=useRef()

  
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage, `/images/${image.name}`);
    await uploadBytes(imageRef, image);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

            // Save the image details to Firestore
    // const firestore = firebaseApp.firestore();
    const firestore = getFirestore(firebaseApp);
    await addDoc(collection(firestore, 'products'), {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      imageUrl: imageUrl,
      userId: user.uid,
      createdAt: new Date().toDateString()
    });
navigate('/')
  };
  

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              ref={nameRef}
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              ref={categoryRef}
              
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" ref={priceRef} />
            <br />
       
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
          
            <br />
            <input type="file"  onChange={(e)=>{setImage(e.target.files[0])}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
