import React from "react";
import { Link } from "react-router-dom";
import home1 from "../assets/home.png";
import "../Styles/Navbar.scss";

function Navbar() {
  return (
    <>
      <div className="navbar w-full bg-[#000000] flex justify-center text-white text-lg font-bold items-center px-36 py-4">
        <div className="logo flex items-center">
          <div className="image w-10  mx-1">
            <Link to="/">
              <img src={home1} alt="" />
            </Link>
          </div>
          <h1>Mock Interview</h1>
        </div>
        <div className="right">
          <ul className="flex items-center">
            <li className="mx-10 hover:text-[#7E30E1] hover:underline duration-500 hover:ease-in-out">
              <Link to="/github">github</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
