import React from "react";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../Hook/useFolder";

export default function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <nav className="flex-grow-1" aria-label="breadcrumb">
       <ol className="bg-white pl-0 m-0 flex">
        {path.map((folder, index) => (
          <li
            key={folder.id}
            className="text-truncate d-inline-block"
            style={{ maxWidth: "150px" }}
          >
            <Link
              to={{
                pathname: folder.id ? `/folder/${folder.id}` : "/",
                state: {
                  folder: { ...folder, path: path.slice(1, index) },
                },
              }}
              className="text-blue-500 hover:underline"
            >
              {folder.name} 
            </Link>
            <span className="m-2">
              /
            </span>
            
        
          </li>
        ))}
        {currentFolder && (
          <li
            className="text-truncate d-inline-block"
            style={{ maxWidth: "200px" }}
            aria-current="page"
          >
            {currentFolder.name}
          </li>
        )}
      </ol> 
     
    </nav>
  );
}
