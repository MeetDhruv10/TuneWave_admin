import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { useAuth } from "../Context/Authcontext";

const Navbar = ({ sidebarToggle, setSidebarToggle, currentUser }) => {
  // const { currentUser } = useAuth();

  return (
    <nav className="bg-black px-4 py-5 flex justify-between">
      <div className="flex">
        <FaBars
          className="text-white mr-4 cursor-pointer mt-1"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-white font-semibold ">TuneWave</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button className=" focus:outline-none text-black ">
              <FaSearch color="black"/>  
            </button>
          </span>
          <input
            type="text"
            className="w-full px-4 py-1 pl-10 rounded shadow outline-none bg-white text-black"
            placeholder="Search..."
          />
        </div>
        <h3 className="text-white font-medium whitespace-nowrap">
  {currentUser === null || (currentUser.displayName === null && currentUser.email === null) ? 'null' : (currentUser.displayName ? currentUser.displayName : currentUser.email)}
</h3>

      </div>
    </nav>
  );
};

export default Navbar;
