// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // Initialize the Firebase app
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

// // Access the auth functionality correctly using getAuth()
// const firestore = app.firestore()
// export const database = {
//   folders: firestore.collection("folders"),
//   files: firestore.collection("files"),
//   formatDoc: doc => {
//     return { id: doc.id, ...doc.data() }
//   },
//   getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
// }
// export const storage = app.storage()
// export const auth = getAuth(app);
// export default app;
/* global firebase */
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Initialize the Firebase app
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

// // Access the auth functionality correctly using getAuth()
// const auth = getAuth(app);

// // Access Firestore using getFirestore()
// const firestore = getFirestore(app);

// // Access Storage using getStorage()
// const storage = getStorage(app);

// // Define the database object
// export const database = {
//   folders: firestore.collection("folders"),
//   files: firestore.collection("files"),
//   formatDoc: doc => {
//     return { id: doc.id, ...doc.data() }
//   },
//   getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
// }


// // Export the app, auth, firestore, and storage objects
// export { app, auth, firestore, storage };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore,collection} from "firebase/firestore";
// import { getStorage } from "firebase/storage";


// // Initialize the Firebase app
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

// // Access the auth functionality correctly using getAuth()
// const auth = getAuth(app);

// // Access Firestore using getFirestore()
// const db = getFirestore(app);

// // Access Storage using getStorage()
// const storage = getStorage(app);

// // Define the database object
// export const database = {
//     folders: collection(firestore, "folders"),
//     files: collection(firestore, "files"),
//     formatDoc: doc => {
//       return { id: doc.id, ...doc.data() }
//     },
//     getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
//   }
  

// // Export the app, auth, firestore, and storage objects
// export { app, auth, db, storage };


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Initialize the Firebase app
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

// // Access the auth functionality correctly using getAuth()
// const auth = getAuth(app);

// // Access Firestore using getFirestore()
// const firestore = getFirestore(app);

// // Access Storage using getStorage()
// const storage = getStorage(app);

// // Define the database object
// export const database = {
//   folders: collection(firestore, "folders"),
//   files: collection(firestore, "files"),
//   formatDoc: doc => {
//     return { id: doc.id, ...doc.data() }
//   },
//   getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
// }

// // Export the app, auth, firestore, and storage objects
// export { app, auth, firestore, storage };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize the Firebase app
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

// Access the auth functionality correctly using getAuth()
export const auth = getAuth(app);
const firestore = getFirestore(app);

// Access Storage using getStorage()
export const storage = getStorage(app);

// Define the database object
export const database = {
  folders: collection(firestore, "folders"),
  files: collection(firestore, "files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: () => new Date().toISOString(),
}
export default app;
