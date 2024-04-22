import React from "react";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <nav className="bg-[#dedada] p-4 w-full fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 pl-4">
          Drive
        </Link>
        <ul className="flex">
          <li className="ml-4">
            <Link to="/user" className="text-gray-800 hover:text-gray-600 pr-4">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
