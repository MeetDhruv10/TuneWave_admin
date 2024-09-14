import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function New_artists() {
  const { register, handleSubmit } = useForm(); 

  const onSubmit = (data) => {
    const mydata = new FormData();
    mydata.append('Name', data.name);
    mydata.append('Biography', data.biography);
    mydata.append('DOB', new Date(data.dob).toISOString());
    mydata.append('image', document.getElementById('myfile').files[0]);

    Axios.post("http://localhost:3000/addArtist", mydata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },)
    .then(response => {
      toast.success('Artist added successfully!');
    })
    .catch(error => {
      toast.error('There was an error adding the artist.');
      console.error('There was an error adding the artist!', error);
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-self-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-3xl mt-10 text-purple-400">
          ADD A NEW ARTIST
        </div>
      </div>
      <br />

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 justify-center border-black"
        >
          <div>
            <label htmlFor="name" className="text-sm font-bold text-black">
              Artist Name
            </label>
            <input
              {...register('name')} 
              name="name"
              type="text"
              className="w-full p-2 border-white rounded mt-1 bg-[#1F2937]"
              placeholder="Enter the artist name"
            />
          </div>
          <br />

          <div>
            <label htmlFor="biography" className="text-sm font-bold text-black">
              Biography
            </label>
            <input
              {...register('biography')}
              name="biography"
              type="text"
              className="w-full p-2 border-white rounded mt-1 bg-[#1F2937]"
              placeholder="Add artist info"
            />
          </div>
          <br />

          <div>
            <label htmlFor="dob" className="text-sm font-bold text-black">
              DOB
            </label>
            <input
              {...register('dob')} 
              name="dob"
              type="date"
              className="w-full p-2 border-white rounded mt-1 bg-[#1F2937]"
              placeholder="Enter the DOB"
            />
          </div>
          <br /><br />
          <div>
            <input type="file" id="myfile" name="myfile " className='bg-white text-black' />
          </div>
          <br />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#1F2937] rounded-md text-white text-sm"
          >
            Add Artist
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default New_artists;
