import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAD5hs1Tj8SZM4K6LJOsqNhMEgrLgWTDsM",
    authDomain: "olxapp-13b72.firebaseapp.com",
    projectId: "olxapp-13b72",
    storageBucket: "olxapp-13b72.appspot.com",
    messagingSenderId: "1089923734909",
    appId: "1:1089923734909:web:64ba5277f83528a101c014",
    measurementId: "G-FVYWMXFWVC"
  };
 
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  
  export { firebaseApp,db };




