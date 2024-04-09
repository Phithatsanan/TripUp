
import MytripLayout from "./Mytrip-Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
// import Datepicker from 'flowbite-react';

export default function Mytrip() {
    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            <MytripLayout>

                <div className="py-12 ">
                    <div className="mx-24 flex flex-wrap justify-between items-center ">
                        <h1 className=" text-4xl  tracking-tight font-semibold text-black ">My Trip</h1>
                        <button onClick={() => setOpenModal(true)} className="flex h-12 items-center  text-black bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca] gap-2 font-medium rounded-xl text-sm px-5 py-2.5  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new trip
                        </button>
                    </div>
                    <div className=" py-14 px-10 md:px-32">
                        <div className=" grid grid-cols-1 gap-8 mx-0 ">

                            <Link to={"/manage"} className="flex flex-col items-center justify-between bg-white border-2 border-gray-300 rounded-3xl  md:flex-row md:max-w-full hover:shadow-lg hover:bg-gray-100  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="bg-clip-border flex flex-col px-12 py-6 leading-normal">
                                    <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">Trip 1</h5>
                                    <h5 className="mb-2 text-lg text-left font-medium tracking-tight text-gray-900 dark:text-white">Bangkok, Thailand</h5>
                                    <h5 className="mb-4 text-md text-left font-normal tracking-tight text-gray-900 dark:text-white">Mar 5 - 9, 2024 (5 days)</h5>
                                    <div className="flex gap-2">
                                        <button onClick={() => setOpenModal(true)} className="flex items-center text-gray-800 bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca]  font-medium rounded-lg text-sm w-30 px-4 lg:px-3.5 py-3.5 lg:py-2 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Edit Trip
                                        </button>
                                        <button onClick={() => setOpenModal(true)} className="flex items-center text-white bg-red-600 dark:text-white hover:bg-red-500  font-medium rounded-lg text-sm w-30 px-4 lg:px-3.5 py-3.5 lg:py-2 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path fill-ƒrule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>
                                            Delete Trip
                                        </button>
                                    </div>
                                </div>
                                <img className="  h-72 md:h-52 md:w-auto md:rounded-none md:rounded-r-3xl " src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/44/69/ba.jpg" alt="" />

                            </Link>


                            <nav aria-label="Page navigation example">
                                <ul className="flex items-center -space-x-px h-8 text-sm">
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Previous</span>
                                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                    </li>
                                    <li>
                                        <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-[#98DB2E] border border-[#98DB2E] bg-[#98DB2E] bg-opacity-20 hover:bg-[#98DB2E] hover:bg-opacity-10 hover:text-[#98DB2E] dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only">Next</span>
                                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>



                        </div>
                    </div>
                </div>

                <Modal dismissible show={openModal} className='bg-black ' size="4xl" position="center" onClose={() => setOpenModal(false)} >
                    <Modal.Header className="py-5 px-10 ">
                        <h1 className="text-3xl font-medium">Add new trip</h1>
                    </Modal.Header>
                    <Modal.Body className="mx-5">
                        <form action="#">
                            <div className="grid grid-rows-3 grid-flow-col gap-4 ">
                                <div className=" col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter trip name" />
                                </div>
                                <div className=" col-span-2">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Destination</label>
                                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected>Select destination city</option>
                                        <option value="Bangkok">Bangkok</option>
                                        <option value="Phuket">Phuket</option>
                                        <option value="Chiangmai">Chiangmai</option>
                                        <option value="Khaoyai">Khaoyai</option>
                                    </select>
                                </div>

                                <div className=" col-span-2">
                                    <label htmlFor="startdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Duration</label>
                                    <div className="flex items-center">
                                        <div className=" relative">

                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>

                                            <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                                        </div>
                                        <span className="mx-4 text-gray-500">to</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row-span-3 col-span-12">

                                </div>



                            </div>
                            <div className="flex items-center mt-10  border-gray-200  dark:border-gray-600">
                                <button type="submit" className="text-black bg-[#98DB2E] hover:bg-[#99db2eca]  font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button onClick={() => setOpenModal(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>



                    </Modal.Body>
                </Modal>

            </MytripLayout>
        </>
    );
}