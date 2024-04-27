// import { useReducer, useEffect } from "react"
// import { useAuth } from "../contextApi/Auth"
// import { database} from "../firebase" 
// import { collection, query, where, orderBy, onSnapshot,doc, getDoc } from "firebase/firestore"; 


// const ACTIONS = {
//   SELECT_FOLDER: "select-folder",
//   UPDATE_FOLDER: "update-folder",
//   SET_CHILD_FOLDERS: "set-child-folders",
//   SET_CHILD_FILES: "set-child-files",
// }

//  export const ROOT_FOLDER = { name: "Root", id: , path: [] }

// function reducer(state, { type, payload }) {
//   switch (type) {
//     case ACTIONS.SELECT_FOLDER:
//       return {
//         folderId: payload.folderId,
//         folder: payload.folder,
//         childFiles: [],
//         childFolders: [],
//       }
//     case ACTIONS.UPDATE_FOLDER:
//       return {
//         ...state,
//         folder: payload.folder,
//       }
//     case ACTIONS.SET_CHILD_FOLDERS:
//       return {
//         ...state,
//         childFolders: payload.childFolders,
//       }
//     // case ACTIONS.SET_CHILD_FILES:
//     //   return {
//     //     ...state,
//     //     childFiles: payload.childFiles,
//     //   }
//     default:
//       return state
//   }
// }

// export function useFolder(folderId = null, folder = null) {
//   const [state, dispatch] = useReducer(reducer, {
//     folderId,
//     folder,
//     childFolders: [],
//     childFiles: [],
//   })

//   const { currentUser } = useAuth()

//   useEffect(() => {
//     dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
//   }, [folderId, folder])

//   useEffect(() => {
//     if (!folderId) {
//       return dispatch({
//         type: ACTIONS.UPDATE_FOLDER,
//         payload: { folder: ROOT_FOLDER },
//       })
//     }

 
//   const docRef = doc(database.folders, folderId); // Get the document reference
//   getDoc(docRef)
//       .then((docSnap) => {
//           if (docSnap.exists()) {
//               // console.log("Document data:", docSnap.data());
//               // Assuming formatDoc correctly formats the Firestore document
//               dispatch({
//                   type: ACTIONS.UPDATE_FOLDER,
//                   payload: { folder: database.formatDoc(docSnap) },
//               });
//           } else {
//               console.log("No such document!");
//               dispatch({
//                   type: ACTIONS.UPDATE_FOLDER,
//                   payload: { folder: ROOT_FOLDER },
//               });
//           }
//       })
//       .catch((error) => {
//           console.error("Error getting document:", error);
//           dispatch({
//               type: ACTIONS.UPDATE_FOLDER,
//               payload: { folder: ROOT_FOLDER },
//           });
//       });
// }, [folderId]);

// useEffect(() => {
//   if (!currentUser || folderId == null) {
//     return;
//   }

//   const q = query(
//     database.folders,
//     // where("parentId", "==", folderId),
//     where("parentId", "==", folderId ? folderId : 1),
//     where("userId", "==", currentUser.uid),
//     orderBy("createdAt")
//   );

//   const unsubscribe = onSnapshot(q, snapshot => {
//     dispatch({
//       type: ACTIONS.SET_CHILD_FOLDERS,
//       payload: { childFolders: snapshot.docs.map(database.formatDoc) },
//     });
//   }, error => {
//     console.error("Error fetching child folders:", error);
//   });

//   return unsubscribe; // Clean up the subscription
// }, [folderId, currentUser]);

// //   useEffect(() => {
// //     return (
// //       database.files
// //         .where("folderId", "==", folderId)
// //         .where("userId", "==", currentUser.uid)
// //         // .orderBy("createdAt")
// //         .onSnapshot(snapshot => {
// //           dispatch({
// //             type: ACTIONS.SET_CHILD_FILES,
// //             payload: { childFiles: snapshot.docs.map(database.formatDoc) },
// //           })
// //         })
// //     )
// //   }, [folderId, currentUser])

//   return state
// }

import { useReducer, useEffect } from "react";
import { useAuth } from "../contextApi/Auth";
import { database } from "../firebase";
import { query, where, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: "root", path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    if (folderId === null) {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    } else {
      const docRef = doc(database.folders, folderId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: database.formatDoc(docSnap) },
            });
          } else {
            console.error("No such document!");
            dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: ROOT_FOLDER },
            });
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: ROOT_FOLDER },
          });
        });
    }
  }, [folderId]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const q = query(
      database.folders,
      where("parentId", "==", folderId || "root"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: snapshot.docs.map(database.formatDoc) },
      });
    }, error => {
      console.error("Error fetching child folders:", error);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [folderId, currentUser]);

  return state;
}
