import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { LuMic2 } from 'react-icons/lu';
import { GiLoveSong } from 'react-icons/gi';
import { PiSignOutBold } from 'react-icons/pi';
import { doSignOut } from '../Firebase/Auth';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

function Sidebar({ sidebarToggle }) {
  const [isArtistDropdownOpen, setIsArtistDropdownOpen] = useState(false);
  const [isSongDropdownOpen, setIsSongDropdownOpen] = useState(false);  // New state for "Songs" dropdown

  const toggleArtistDropdown = () => {
    setIsArtistDropdownOpen(!isArtistDropdownOpen);
  };

  const toggleSongDropdown = () => {
    setIsSongDropdownOpen(!isSongDropdownOpen);  // Toggling the Songs dropdown
  };

  return (
    <div
      className={`${sidebarToggle ? " hidden " : " block "}bg-gray-800 fixed h-full px-4 py-2 top-0`}
      style={{ width: "16rem" }}
    >
      <div className='my-2 mb-4 mt-16'>
        <h1 className='text-white text-lg font-bold'> Welcome Admin </h1>
      </div>
      <hr className='border-gray-700' />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded py-2 hover:bg-gray-700'>
          <a href="/" className='px-3 flex items-center'>
            <FaHome className='inline-block w-6 h-6 mr-2' color='blue' />
            Dashboard
          </a>
        </li>

        {/* Artists Dropdown */}
        <li className='mb-2 rounded py-2 cursor-pointer' onClick={toggleArtistDropdown}>
          <div className='px-3 flex items-center justify-between hover:bg-gray-700 py-2 rounded '>
            <span className='flex items-center'>
              <LuMic2 className='inline-block w-6 h-6 mr-2' color='pink'/>
              Artists
            </span>
            <span>{isArtistDropdownOpen ? '▲' : '▼'}</span>
          </div>
          {isArtistDropdownOpen && (
            <ul className='ml-8 mt-2 space-y-2'>
              <li className='rounded py-2 hover:bg-gray-700'>
                <a href="/artists" className='px-3 flex items-center  rounded'>
                  Add Artists
                </a>
              </li>
              <li className='rounded py-2 hover:bg-gray-700'>
                <a href="/manage" className='px-3 flex items-center  rounded'>
                  Manage Artists
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Songs Dropdown */}
        <li className='mb-2 rounded py-2 cursor-pointer' onClick={toggleSongDropdown}>
          <div className='px-3 flex items-center justify-between hover:bg-gray-700 py-2 rounded '>
            <span className='flex items-center'>
              <GiLoveSong className='inline-block w-6 h-6 mr-2' color='#009494' />
              Songs
            </span>
            <span>{isSongDropdownOpen ? '▲' : '▼'}</span>
          </div>
          {isSongDropdownOpen && (
            <ul className='ml-8 mt-2 space-y-2'>
              <li className='rounded py-2 hover:bg-gray-700'>
                <a href="/add-songs" className='px-3 flex items-center rounded'>
                  Add Songs
                </a>
              </li>
              <li className='rounded py-2 hover:bg-gray-700'>
                <a href="/manage-songs" className='px-3 flex items-center rounded'>
                  Manage Songs
                </a>
              </li>
            </ul>
          )}
        </li>

        <li className='rounded py-2 hover:bg-gray-700'>
          <a href="/User Info" className='px-3 flex items-center rounded'>
            <FaUser className='inline-block w-5 h-6 mr-2'/>
            User Info
          </a>
        </li>

        <li className='mb-2 rounded hover:bg-gray-700 py-2' onClick={() => { doSignOut() }}>
          <Link to="/login" className='px-3 flex items-center'>
            <PiSignOutBold className='inline-block w-6 h-6 mr-2' color='red'/>
            SignOut
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
