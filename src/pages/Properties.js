import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import { ToastContainer,toast } from "react-toastify";
function Properties() {
  const user = useSelector((state) => state.user);
  const [properties, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [openModal, setOpenModal] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [status,setStatus]=useState(0)
  const [Form, setForm] = useState({
    name: String,
    place: String,
    area: String,
    bedrooms: Number,
    bathrooms: Number,
    hospitals: String,
    colleges: String,
    price: Number,
  });
  const get = async () => {
    await axios
      .get(`/property/filter/${user._id}`)
      .then((res) => {
        console.log(res);
        setProperty(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    get();
  }, [status]);
  useEffect(() => {
    Pagination();
    console.log(pageNumbers);
  }, [properties]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = properties?.slice(indexOfFirstPost, indexOfLastPost);
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const Pagination = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= Math.ceil(properties?.length / postsPerPage); i++) {
      paginationNumbers.push(i);
      console.log(i);
    }
    setPageNumbers(paginationNumbers);
  };
  const Update=async(e,id)=>{
    e.preventDefault()
    setOpenModal(false);
    console.log(Form)
    await axios.put(`/property/update/${id}`,Form)
    .then((res)=>{
      console.log(res.data)
      toast.success(res.data.message)
      setStatus(Math.random())
    }).catch((error)=>{
      toast.error(error.message)
    })
  }
  const Delete=async(id)=>{
    await axios.delete(`property/delete/${id}`)
    .then((res)=>{
      console.log(res.data);
      toast(res.data.message)
      setStatus(Math.random());

    }).catch((error)=>{
      console.log(error)
    })
  }
  const Search = (e) => {
    var filtered = properties.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(e.toLowerCase());
    });
    console.log(filtered);
    setProperty(filtered);
    if (e.length <= 1) {
      setStatus(Math.random());
    }
  };
  return (
    <div>
      <ToastContainer/>
      <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Your Properties
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
        {currentPosts?.map((e) => {
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
                <div className="flex justify-center space-x-5">
                  <Button
                    className="bg-red-400"
                    onClick={() => {
                      setOpenModal(true);
                      setForm((prev) => ({ ...prev, name: e.name }));
                      setForm((prev) => ({ ...prev, place: e.place }));
                      setForm((prev) => ({ ...prev, area: e.area }));
                      setForm((prev) => ({ ...prev, bedrooms: e.bedrooms }));
                      setForm((prev) => ({ ...prev, bathrooms: e.bathrooms }));
                      setForm((prev) => ({ ...prev, hospitals: e.hospitals }));
                      setForm((prev) => ({ ...prev, colleges: e.colleges }));
                      setForm((prev) => ({ ...prev, price: e.price }));
                    }}
                  >
                    Update
                  </Button>
                  <Button className="bg-red-800" onClick={el=>Delete(e._id)}>Delete</Button>
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Update</Modal.Header>
                  <Modal.Body>
                    <form
                      class="max-w-md mx-auto"
                      key={e._id}
                      onSubmit={(es) => Update(es, e._id)}
                    >
                      <div className="space-y-6">
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="name"
                            value={Form.name}
                            onChange={(el) =>
                              setForm((prev) => ({
                                ...prev,
                                name: el.target.value,
                              }))
                            }
                            id="floating_email"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="floating_email"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Name
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="place"
                            value={Form.place}
                            id="floating_email"
                            onChange={(el) =>
                              setForm((prev) => ({
                                ...prev,
                                place: el.target.value,
                              }))
                            }
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="floating_password"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Place
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            value={Form.area}
                            onChange={(el) =>
                              setForm((prev) => ({
                                ...prev,
                                area: el.target.value,
                              }))
                            }
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="floating_repeat_password"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Area
                          </label>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              type="number"
                              value={Form.bedrooms}
                              onChange={(el) =>
                                setForm((prev) => ({
                                  ...prev,
                                  bedrooms: parseInt(el.target.value),
                                }))
                              }
                              min={1}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="floating_first_name"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Bedrooms
                            </label>
                          </div>
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              type="number"
                              onChange={(el) =>
                                setForm((prev) => ({
                                  ...prev,
                                  bathrooms: parseInt(el.target.value),
                                }))
                              }
                              value={Form.bathrooms}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              min={1}
                            />
                            <label
                              for="floating_last_name"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Bathrooms
                            </label>
                          </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="hospitals"
                              onChange={(el) =>
                                setForm((prev) => ({
                                  ...prev,
                                  hospitals: el.target.value,
                                }))
                              }
                              value={Form.hospitals}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="floating_phone"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Hospitals
                            </label>
                          </div>
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="place"
                              value={Form.colleges}
                              onChange={(el) =>
                                setForm((prev) => ({
                                  ...prev,
                                  colleges: el.target.value,
                                }))
                              }
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="floating_company"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Colleges
                            </label>
                          </div>
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              type="number"
                              value={Form.price}
                              onChange={(el) =>
                                setForm((prev) => ({
                                  ...prev,
                                  price: parseInt(el.target.value),
                                }))
                              }
                              min={100}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="floating_company"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Price
                            </label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="bg-red-600"
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      Cancel
                    </Button>
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

export default Properties;
