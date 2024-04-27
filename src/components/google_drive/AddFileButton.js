// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// // import { Progress } from '@headlessui/react';
// import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useAuth } from "../../contextApi/Auth";
// import { storage, database } from "../../firebase";
// import { ROOT_FOLDER } from "../../Hook/useFolder";
// import { v4 as uuidV4 } from "uuid";


// export default function AddFileButton({ currentFolder }) {
//   const [uploadingFiles, setUploadingFiles] = useState([]);
//   const { currentUser } = useAuth();

//   function handleUpload(e) {
//     const file = e.target.files[0];
//     if (currentFolder == null || file == null) return;

//     const id = uuidV4();
//     setUploadingFiles((prevUploadingFiles) => [
//       ...prevUploadingFiles,
//       { id: id, name: file.name, progress: 0, error: false },
//     ]);
//     const filePath =
//       currentFolder === ROOT_FOLDER
//         ? `${currentFolder.path.join("/")}/${file.name}`
//         : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

//     const uploadTask = storage
//       .ref(`/files/${currentUser.uid}/${filePath}`)
//       .put(file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = snapshot.bytesTransferred / snapshot.totalBytes;
//         setUploadingFiles((prevUploadingFiles) => {
//           return prevUploadingFiles.map((uploadFile) => {
//             if (uploadFile.id === id) {
//               return { ...uploadFile, progress: progress };
//             }

//             return uploadFile;
//           });
//         });
//       },
//       () => {
//         setUploadingFiles((prevUploadingFiles) => {
//           return prevUploadingFiles.map((uploadFile) => {
//             if (uploadFile.id === id) {
//               return { ...uploadFile, error: true };
//             }
//             return uploadFile;
//           });
//         });
//       },
//       () => {
//         setUploadingFiles((prevUploadingFiles) => {
//           return prevUploadingFiles.filter((uploadFile) => {
//             return uploadFile.id !== id;
//           });
//         });

//         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//           database.files
//             .where("name", "==", file.name)
//             .where("userId", "==", currentUser.uid)
//             .where("folderId", "==", currentFolder.id)
//             .get()
//             .then((existingFiles) => {
//               const existingFile = existingFiles.docs[0];
//               if (existingFile) {
//                 existingFile.ref.update({ url: url });
//               } else {
//                 database.files.add({
//                   url: url,
//                   name: file.name,
//                   createdAt: database.getCurrentTimestamp(),
//                   folderId: currentFolder.id,
//                   userId: currentUser.uid,
//                 });
//               }
//             });
//         });
//       }
//     );


//   }



//   return (
//     <>
//       <label className="inline-flex items-center border w-8 h-8 ml-[85rem] border-green-700 py-1 px-3 rounded text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 m-0 mr-2">
//         <FontAwesomeIcon icon={faFileUpload} className="mr-2  text-green-500" />
//         <input
//           type="file"
//           onChange={handleUpload}
//           className="opacity-0 absolute left-[-9999px]"
//         />
//       </label>
//       {uploadingFiles.length > 0 &&
//         ReactDOM.createPortal(
//           <div
//             className="fixed bottom-4 right-4 max-w-xs"
//           >
//             {uploadingFiles.map((file) => (
//               <div key={file.id} className="mb-2">
//                 <div className="bg-white shadow-md rounded-md">
//                   <div className="px-4 py-2">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm truncate">{file.name}</p>
//                       <button
//                         onClick={() => {
//                           setUploadingFiles((prevUploadingFiles) =>
//                             prevUploadingFiles.filter(
//                               (uploadFile) => uploadFile.id !== file.id
//                             )
//                           );
//                         }}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 text-gray-600 hover:text-gray-800"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="mt-2">
//                       {/* <Progress
//                         className="h-2"
//                         value={file.error ? 100 : file.progress * 100}
//                         variant={file.error ? "danger" : "primary"}
//                       /> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>,
//           document.body
//         )}
//     </>
//   );
// }

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contextApi/Auth";
import { storage, database } from "../../firebase";
import { ROOT_FOLDER } from "../../Hook/useFolder";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, query, where, getDocs } from "firebase/firestore";

export default function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    const filePath = currentFolder === ROOT_FOLDER
      ? `${currentFolder.path.join("/")}/${file.name}`
      : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;
    const fileRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    
    setUploadingFiles(prevUploadingFiles => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false }
    ]);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingFiles(prevUploadingFiles => prevUploadingFiles.map(uploadFile => {
          if (uploadFile.id === id) {
            return { ...uploadFile, progress: progress };
          }
          return uploadFile;
        }));
      },
      (error) => {
        setUploadingFiles(prevUploadingFiles => prevUploadingFiles.map(uploadFile => {
          if (uploadFile.id === id) {
            return { ...uploadFile, error: true };
          }
          return uploadFile;
        }));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const fileQuery = query(database.files, where("name", "==", file.name), where("userId", "==", currentUser.uid), where("folderId", "==", currentFolder.id));
          getDocs(fileQuery).then(existingFiles => {
            const existingFile = existingFiles.docs[0];
            if (existingFile) {
              existingFile.ref.update({ url: url });
            } else {
              addDoc(database.files, {
                url: url,
                name: file.name,
                createdAt: new Date(),
                folderId: currentFolder.id,
                userId: currentUser.uid
              });
            }
          });
          setUploadingFiles(prevUploadingFiles => prevUploadingFiles.filter(uploadFile => uploadFile.id !== id));
        });
      }
    );
  }

  return (
    <>
      <label className="inline-flex items-center justify-center border w-8 h-8  border-green-700 py-1 px-3  text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} className="mr-2 text-green-500" />
        <input
          type="file"
          onChange={handleUpload}
          className="opacity-0 absolute left-[-9999px]"
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div className="fixed bottom-4 right-4 max-w-xs">
            {uploadingFiles.map((file) => (
              <div key={file.id} className="mb-2">
                <div className="bg-white shadow-md rounded-md">
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm truncate">{file.name}</p>
                      <button
                        onClick={() => {
                          setUploadingFiles(prevUploadingFiles =>
                            prevUploadingFiles.filter(uploadFile => uploadFile.id !== file.id)
                          );
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
