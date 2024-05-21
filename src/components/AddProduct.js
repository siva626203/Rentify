import React, { useEffect, useState } from 'react'
import {storage} from '../firebase'
import { getDownloadURL,uploadBytes,ref } from 'firebase/storage';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function AddProduct() {
  const user=useSelector((state)=>state.user)
  const navigate=useNavigate()
    const [property, setProperty] = useState({
      name: String,
      place: String,
      area: String,
      bedrooms: Number,
      bathrooms: Number,
      hospitals: String,
      colleges: String,
      price: Number,
      images: [],
      seller: String,
    });
    const [progress,setProgresspercent]=useState(0)
    const [file,setFile]=useState(undefined)
    const Submit=async(e)=>{
        e.preventDefault()
         
         console.log(file);
         if (file.length>0){
            const URLs = [];
            for (var i = 0; i < file.length; i++) {
              const storageRef = ref(storage, `files/${file[i].name}`);
              const uploadTask = uploadBytes(storageRef, file[i]);
              await uploadTask.then(async(res)=>{
                console.log(res)
                await getDownloadURL(res.ref).then(
                (downloadURL) => {
                  property.images.push(downloadURL)
                 
                }
                
              );
               setTimeout(
                 setProperty((prev) => ({ ...prev, images: URLs })),
                 3000
               );
                toast.success("Image Uploaded")
              })
              
            }
            
         };
           
        
        await axios
          .post("/property/register", property)
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
            navigate("/properties");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message);
          });      
    }
    useEffect(()=>{
      setProperty((prev) => ({ ...prev, seller: user._id }));
    },[])
  return (
    <div>
      <ToastContainer />
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Add Product
      </h1>

      <form class="max-w-lg mx-auto" onSubmit={Submit}>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="base-input"
            value={property.name}
            required
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, name: e.target.value }))
            }
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Place
          </label>
          <input
            type="text"
            value={property.place}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, place: e.target.value }))
            }
            required
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Area
          </label>
          <input
            type="text"
            value={property.area}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, area: e.target.value }))
            }
            required
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bedrooms
          </label>
          <input
            type="number"
            value={property.bedrooms}
            required
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, bedrooms: e.target.value }))
            }
            maxLength={2}
            min={1}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bathrooms
          </label>
          <input
            value={property.bathrooms}
            type="number"
            required
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, bathrooms: e.target.value }))
            }
            min={1}
            maxLength={2}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Hospitals
          </label>
          <input
            type="text"
            value={property.hospitals}
            required
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, hospitals: e.target.value }))
            }
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Colleges
          </label>
          <input
            type="text"
            value={property.colleges}
            required
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, colleges: e.target.value }))
            }
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="base-input"
            value={property.price}
            required
            min={100}
            maxLength={16}
            minLength={3}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, price: e.target.value }))
            }
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Seller
          </label>
          <input
            type="text"
            id="base-input"
            value={property.seller}
            required
            min={100}
            maxLength={16}
            minLength={3}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, seller: e.target.value }))
            }
            disabled
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="user_avatar"
        >
          Upload Image
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          required
          accept="image/png, image/jpeg"
          onChange={(e) => setFile(e.target.files)}
          id="user_avatar"
          type="file"
          multiple
        />
        <div className="mt-10 mb-10 pb-10">
          <button
            type="submit"
            class="focus:outline-none w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct