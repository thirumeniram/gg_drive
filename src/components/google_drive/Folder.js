import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export default function Folder({ folder }) {
  return (
    <Link
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      className="inline-flex items-center border border-gray-700 py-1 px-3 rounded text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-truncate w-full"
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      <span className="truncate">{folder.name}</span>
    </Link>
  );
}
