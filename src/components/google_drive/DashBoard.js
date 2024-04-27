import React,{useEffect} from "react";
import { useFolder } from "../../Hook/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import Folder from "./Folder";
import File from "./File";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation,useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams();
  const navigate = useNavigate(); 
  const { state = {} } = useLocation();

  //  const  {folder,childFolders}= useFolder("W6lq4iR1GmOnRaX7StBr");
   const  {folder,childFolders}= useFolder(folderId);
  // console.log("cfolders", folder);  
  // console.log("childfolders", childFolders);  
  console.log("statefolder", state);  


  // useEffect(() => {
  //   if (folder && folder.id !== folderId) {
  //     navigate(`/folder/${folder.id}`);
  //   }
  // }, [folder, folderId, navigate])


  return (
    <>
      <Navbar />
      <div className="pt-20 pl-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* {/* <FolderBreadcrumbs currentFolder={folder} /> */}
          {/* <AddFileButton currentFolder={folder}
            currentFolder={folder}
           /> 
          */}
          <FolderBreadcrumbs currentFolder={folder} /> 
          <div className="mr-7">
          <AddFileButton currentFolder={folder}/>
          <AddFolderButton currentFolder={folder}  /> 
          </div>
          
        </div>
        
        {childFolders.length > 0 && (
          <div className="flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {/* {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}  */}
        </div>
      </div>
    </>
  );
}
