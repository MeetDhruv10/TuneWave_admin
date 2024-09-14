import React, { useEffect, useState } from 'react';
import Axios from 'Axios';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Manage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/searchArtist');
        setArtists(response.data);
        //console.log(artists)
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    getArtists();
  }, []);

  const deleteArtist = async (id) => {
    try {
      await Axios.post('http://localhost:3000/deleteArtist', { id });
      setArtists(artists.filter(artist => artist._id !== id));
      toast.success('Artist deleted successfully!');

    
    } catch (error) {
      console.error('Error deleting artist:', error);
      toast.error('There was an error deleting the artist.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='bg-black p-4'>
        {artists.length !== 0 ? (
          artists.map((artist, index) => (
            <div key={index} className="artist-container bg-white text-black m-4 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={`https://tunewave-artists-image.s3.ap-south-1.amazonaws.com/${artist.photo}`} alt="" className="w-24 h-24 object-cover rounded-full" />
                <div>
                  <h2 className="text-xl font-bold">{`Name: ${artist.Name}`}</h2>
                  <p>{`Biography:  ${artist.Biography}`}</p>
                  <h3>{`DOB: ${new Date(artist.DOB).getDate()}-${new Date(artist.DOB).getMonth() + 1}-${new Date(artist.DOB).getFullYear()}`}</h3>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <MdDeleteForever className='text-red-500 cursor-pointer' size={24}
                  onClick={() => deleteArtist(artist._id)}title="delete"
                
                />
                <CiEdit className='text-blue-500 cursor-pointer' size={24} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No artists found.</p>
        )}
      </div>
    </div>
  );
}

export default Manage;
