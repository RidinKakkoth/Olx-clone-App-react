import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';
import { FirebaseContext } from './store/Context';
import { firebaseApp,firestore,storage } from './firebase/config';
import Context from './store/Context';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebaseApp,firestore,storage}}>
      <Context>
      <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
