import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Modal } from "flowbite-react";
function Home() {
  const user=useSelector((state)=>state.user)
  const [properties,setProperty]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [openModal, setOpenModal] = useState(false);
  const [pageNumbers,setPageNumbers]=useState([])
  const [status,setStatus]=useState(0)
  const get = async () => {
    await axios
      .get("/property/all")
      .then((res) => {
        console.log(res.data.data);
        setProperty(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(()=>{
    get()
    
  },[status])
  useEffect(()=>{
Pagination();
console.log(pageNumbers)
  },[properties])
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = properties?.slice(indexOfFirstPost, indexOfLastPost);
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const Pagination = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= Math?.ceil(properties.length / postsPerPage); i++) {
      paginationNumbers.push(i);
      console.log(i)
    }
    setPageNumbers(paginationNumbers)
  };
  const Search = (e) => {
   
    var filtered=properties.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(e.toLowerCase());
    });
    console.log(filtered)
    setProperty(filtered);
    if(e.length<=1){
      setStatus(Math.random())
    }
  };
  return (
    <div>
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Home
      </h1>
     <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <input
            type="search"
            id="default-search"
            onChange={e=>Search(e.target.value)}
            class="block w-full p-4 ps-10 text-sm placeholder:m-22 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          
        </div>
      </form>
      <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 gap-y-10 pl-10 pt-12">
        {currentPosts.map((e) => {
          return (
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {e.images.map((e) => {
                return (
                  <img class="rounded-t-lg md:w-[300px]" src={e} alt="img" />
                );
              })}
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Property Name {e.name}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Place {e.place}
                  <br />
                  Area {e.area}
                  <br />
                  Bedrooms {e.bedrooms}
                  <br />
                  Bathrooms {e.bathrooms}
                  <br />
                  Hospitals {e.hospitals}
                  <br />
                  Colleges {e.colleges}
                  <br />
                  Price {e.price}
                </p>

                {/* <!-- Modal toggle --> */}
                {user.email.length<=1 ? (
                  <p className="text-red-800">Must be login to see owner details</p>
                ) : (
                  <Button onClick={() => setOpenModal(true)}>Interested</Button>
                )}

                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Owner Details</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Name: {e?.seller?.firstname}
                        <br />
                        Email: {e?.seller?.email}
                        <br />
                        Phone Number: {e?.seller?.phonenumber}
                        <br />
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Ok</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          );
        })}
      </div>
      <div class="flex justify-center">
        {/* <!-- Next Button --> */}
        <nav aria-label="Page navigation example">
          <ul class="flex items-center -space-x-px h-10 text-base">
            {pageNumbers.map((e) => {
              return (
                <li>
                  <button
                    onClick={(el) => handlePagination(e)}
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {e}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home