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
            {index < path.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 5.293a1 1 0 0 1 0 1.414L8.414 11H4a1 1 0 1 1 0-2h3.586l-4.293-4.293a1 1 0 0 1 1.414-1.414zM9 5a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1zm3 3a1 1 0 1 1 0 2h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2zm0-4a1 1 0 1 1 0 2h8a1 1 0 1 1 0 2h-8a1 1 0 1 1 0-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
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
