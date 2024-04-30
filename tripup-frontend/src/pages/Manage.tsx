import MytripLayout from "./Mytrip-Layout"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Datepicker } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Manage() {

    const [editTrip, setEditTrip] = useState(false);
    const [deleteTrip, setDeleteTrip] = useState(false);

    const navigate = useNavigate()
    const confirmDeleteTrip = () => {
        setDeleteTrip(false);
        navigate("/mytrip");
    }
    
  
    return (

        <>
            <MytripLayout>

                {/* Breadcrumb page navbar */}
                <nav className="flex px-10 py-3 border-b " aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-black hover:text-[#98DB2E] dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <Link to="/mytrip" className="ms-1 text-sm font-medium text-black hover:text-[#98DB2E] md:ms-2 dark:text-gray-400 dark:hover:text-white">My Trip</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Manage Trip</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Trip heading bar  */}
                <div className="py-10">
                    {/* <div className="mx-24 mb-10 flex flex-wrap justify-between items-center ">
                        <h1 className=" text-4xl  tracking-tight font-semibold text-black ">Manage Trip</h1>
                    </div> */}
                    <div className="mx-14">
                        <div className="flex flex-col items-center justify-between bg-white border-2 border-gray-300 rounded-3xl  md:flex-row md:max-w-full ">
                            <div className="bg-clip-border flex flex-col px-12 py-6 leading-normal">
                                <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">Trip 1</h5>
                                <h5 className="mb-2 text-lg text-left font-medium tracking-tight text-gray-900 dark:text-white">Bangkok, Thailand</h5>
                                <h5 className="mb-4 text-md text-left font-normal tracking-tight text-gray-900 dark:text-white">Mar 5 - 9, 2024 (5 days)</h5>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditTrip(true)} className="flex items-center text-gray-800 bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca]  font-medium rounded-lg text-sm w-30 px-4 lg:px-3.5 py-3.5 lg:py-2 mr-2 dark:hover:bg-gray-700 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                        </svg>
                                        Edit Trip
                                    </button>
                                    <button onClick={() => setDeleteTrip(true)} className="flex items-center text-white bg-red-600 dark:text-white hover:bg-red-500  font-medium rounded-lg text-sm w-30 px-4 lg:px-3.5 py-3.5 lg:py-2 mr-2 dark:hover:bg-gray-700 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                            <path fill-ƒrule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                        </svg>
                                        Delete Trip
                                    </button>
                                </div>
                            </div>
                            <img className="  h-72 md:h-52 md:w-auto md:rounded-none md:rounded-r-3xl " src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/44/69/ba.jpg" alt="" />

                        </div>


                    </div>
                </div>



                <Modal dismissible show={editTrip} className='bg-black ' size="4xl" position="center" onClose={() => setEditTrip(false)} >
                    <Modal.Header className="py-5 px-10 ">
                        <h1 className="text-3xl font-medium">Edit Trip</h1>
                    </Modal.Header>
                    <Modal.Body className="mx-5">
                        <form action="#">
                            <div className="grid grid-rows-3 grid-flow-col gap-5 ">
                                <div className=" col-span-2">
                                    <label htmlFor="Trip name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Name</label>
                                    <input type="text" name="name" id="Trip name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter trip name" />
                                </div>
                                <div className=" col-span-2">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Destination</label>
                                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option >Select destination city</option>
                                        <option selected value="Bangkok">Bangkok</option>
                                        <option value="Phuket">Phuket</option>
                                        <option value="Chiangmai">Chiangmai</option>
                                        <option value="Khaoyai">Khaoyai</option>
                                    </select>
                                </div>

                                <div className=" col-span-2">
                                    <label htmlFor="startdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Duration</label>
                                    <div className="flex items-center">

                                        {/* <div className=" relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                                            
                                        </div> */}
                                        <Datepicker className="focus:ring-[#98DB2E] focus:border-[#98DB2E] block" />
                                        <span className="mx-4 text-gray-500">to</span>
                                        <Datepicker />
                                    </div>
                                </div>
                                <div className="row-span-3 col-span-12 items-center content-center space-y-4 ">
                                    <div className="flex items-center justify-center w-full ">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center   cursor-pointer   ">
                                            <div className=" text-center text-gray-500 dark:text-gray-400 hover:brightness-50">
                                                <img className="mx-auto ring-1 ring-gray-300 w-auto h-52 rounded-2xl" src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/44/69/ba.jpg" alt="" />
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center mt-10  border-gray-200  dark:border-gray-600">
                                <button type="submit" className="text-black bg-[#98DB2E] hover:bg-[#99db2eca]  font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button onClick={() => setEditTrip(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal show={deleteTrip} size="md" onClose={() => setDeleteTrip(false)} popup dismissible>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this Trip?
                            </h3>
                            <div className="flex justify-center gap-4">

                                <button onClick={confirmDeleteTrip} className="text-white bg-red-600 hover:bg-red-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{"Yes, I'm sure"}</button>
                                <button onClick={() => setDeleteTrip(false)} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>

                                {/* <button color="failure" onClick={() => setDeleteTrip(false)}>
                                    {"Yes, I'm sure"}
                                </button>
                                <Button color="gray" onClick={() => setDeleteTrip(false)}>
                                    No, cancel
                                </Button> */}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>



            </MytripLayout >
        </>
    )
}