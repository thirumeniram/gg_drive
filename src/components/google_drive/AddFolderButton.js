import React, { useState } from "react";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
 import { database } from "../../firebase";
 import { addDoc } from "firebase/firestore";
 import { useAuth } from "../../contextApi/Auth";
import { ROOT_FOLDER } from "../../Hook/useFolder";

// currentFolder
export default function AddFolderButton(currentFolder) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  
  function handleSubmit(e) {
    e.preventDefault();

    if(currentFolder===null)
    return;
  
    if (name.trim() === '') {
      // Handle empty folder name error
      return;
    }
  
    addDoc(database.folders, {
      name: name,
      // Other fields you want to add to the document
      // For example: parentId, userId, path, createdAt
      
      random:currentFolder,
      parentId: currentFolder.name+currentFolder.id,
      userId: currentUser.uid,
      // path: path,
      createdAt: database.getCurrentTimestamp(),
    }).then(() => {
      console.log('Folder added successfully');
      setName('');
      closeModal();
    }).catch(error => {
      console.error('Error adding folder: ', error);
      // Handle error adding folder
    });
  }



  return (
    <>
     
     <div className="inline-flex items-center justify-center border border-green-700  w-8 h-8 ">
  <Button
    onClick={openModal}
    className="inline-flex items-center py-2 px-2 ml-10 rounded-lg text-green-500  "
  >
    <FontAwesomeIcon icon={faFolderPlus} className="mr-2 color-green text-green-500 px-2" />
  </Button>
</div>




      {open && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full h-[2.5rem]">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title pl-3">
                        Add Folder
                      </h3>
                      <div className="mt-2 w-full">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="shadow-sm h-[2.5rem] pl-[1rem] focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter folder name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-[1rem]">
                  <button
                    type="submit"
                    className="w-full  inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Folder
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

