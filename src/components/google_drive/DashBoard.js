import React from "react";
import { useFolder } from "../../Hook/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import Folder from "./Folder";
import File from "./File";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation } from "react-router-dom";

export default function Dashboard() {
//   const { folderId } = useParams();
//   const { state = {} } = useLocation();
//   const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

  return (
    <>
      <Navbar />
      <div className="pt-20 pl-10">
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* {/* <FolderBreadcrumbs currentFolder={folder} /> */}
          {/* <AddFileButton currentFolder={folder} /> 
          currentFolder={folder}*/}
          <AddFolderButton  /> 
          Content
        </div>
        {/* {childFolders.length > 0 && (
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
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
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
        )} */}
        </div>
      </div>
    </>
  );
}
