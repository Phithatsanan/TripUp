// import React, { useEffect, useState } from 'react';
import Layout from "./Layout";
import { Link } from "react-router-dom";
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';



export default function Explore() {
    return (
        <>
            <Layout>

                {/* search bar */}
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-10 px-10 mx-auto max-w-screen-xl sm:py-16 sm:px-6">
                        <div className="mx-auto max-w-screen-sm text-center lg:mb-0">
                            <h1 className="mb-8 text-2xl md:text-3xl tracking-tight font-medium text-gray-900 dark:text-white">Explore your favorite trip !</h1>
                            <div className="">
                                <input
                                    type="search"
                                    // value={searchTerm}
                                    // onChange={handleSearchChange}
                                    placeholder="Search for a city"
                                    className="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-[#98DB2E] focus:border-[#98DB2E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trip card */}

                <div className="  sm:mx-auto max-w-screen-xl mx-10">
                    <div className=" grid gap-6    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   justify-items-center ">

                        <div className="  bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                            <Link to="#" className="block">
                                <img className="rounded-t-2xl object-cover h-44" loading="lazy" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                </div>
                            </Link>
                        </div>

                        <div className="  bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                            <Link to="#" className="block">
                                <img className="rounded-t-2xl object-cover h-44" loading="lazy" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                </div>
                            </Link>
                        </div>

                        <div className="  bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                            <Link to="#" className="block">
                                <img className="rounded-t-2xl object-cover h-44" loading="lazy" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                </div>
                            </Link>
                        </div>

                        <div className="  bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                            <Link to="#" className="block">
                                <img className="rounded-t-2xl object-cover h-44" loading="lazy" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                </div>
                            </Link>
                        </div>

                        <div className="  bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                            <Link to="#" className="block">
                                <img className="rounded-t-2xl object-cover h-44" loading="lazy" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                </div>
                            </Link>
                        </div>

                        <div className="  bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                            <Link to="#" className="block">
                                <img className="rounded-t-2xl object-cover h-44" loading="lazy" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                </div>
                            </Link>
                        </div>








                    </div>

                <nav aria-label="Page navigation example " className="flex py-16 justify-center">
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

                


            </Layout>
        </>
    );
}