import Layout from "./Layout";
import { useState } from "react";

export default function Destination() {

    const [activeTab, setActiveTab] = useState('dashboard'); // Default active tab is 'dashboard'

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Layout>

            <nav className="flex px-10 py-3 " aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-black hover:text-[#98DB2E] dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ms-1 text-sm font-medium text-black hover:text-[#98DB2E] md:ms-2 dark:text-gray-400 dark:hover:text-white">Discover</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-black md:ms-2 dark:text-gray-400">Bangkok</span>
                        </div>
                    </li>
                </ol>
            </nav>


            <div className="h-60 bg-no-repeat bg-center bg-cover bg-[url('https://akholidaysnepal.com/wp-content/uploads/2018/10/bangkok.jpg')] ">
            </div>

            <section className="bg-white dark:bg-gray-900">
                <div className="md:py-8 p-6 md:px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="font-semibold text-md">YOUR ESSENTIAL GUIDE TO</span>
                    </div>
                    <h2 className="mb-5 text-7xl md:text-8xl font-medium tracking-tight text-black dark:text-white">Bangkok</h2>
                    <p className="mb-5 text-lg font-light text-black dark:text-gray-400">Bangkok is the capital and most important city in Thailand, with a population of over 10 million people. Thanks to its growing economic development and massive popularity as an international tourist destination, it has become one of Southeast Asia's most influential and modern cities.</p>
                </div>
            </section>

            <div className="py-12 md:py-16 bg-black ">
                <h1 className=" mx-10 md:mx-24 text-2xl md:text-3xl text-center tracking-tight font-medium text-white ">Things to do in Bangkok</h1>

                <div className=" overflow-x-auto  py-10 px-10">
                    {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                    <div className=" grid grid-rows-1 grid-flow-col gap-8 mx-0   ">
                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>

                        <div className="w-60 items-center  hover:brightness-50">
                            <a href="#" className="block">
                                <img className=" rounded-full " src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 md:py-16 ">
                <h1 className="mx-10 md:mx-24 text-2xl md:text-3xl tracking-tight font-medium text-black ">Tourist Attractions in Bangkok</h1>
                <div className=" py-10 md:py-16 px-10 md:px-32">
                    <div className=" grid grid-cols-1 gap-8 mx-0   ">
                        <a href="#" className="flex flex-col items-center bg-white border-2 border-gray-200 rounded-3xl hover:shadow-lg md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-full rounded-t-xl  h-72 md:h-auto md:w-44 md:rounded-none md:rounded-s-3xl" src="https://lp-cms-production.s3.amazonaws.com/public/2021-06/shutterstockRF_517093306.jpg" alt="" />
                            <div className="flex flex-col p-10 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wat Arun</h5>
                                <p className=" font-normal text-gray-700 dark:text-gray-400">Wat Arun is the missile-shaped temple that rises from the Chao Phraya River's banks. Known as Temple of Dawn, it was named after the Indian god of dawn, Arun. It was here that, after the destruction of Ayuthaya, King Taksin stumbled upon a small local shrine and interpreted the discovery as an auspicious sign that this should be the site of the new capital of Siam.</p>
                            </div>
                        </a>

                        <a href="#" className="flex flex-col items-center bg-white border-2 border-gray-200 rounded-3xl hover:shadow-lg md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-full rounded-t-xl  h-72 md:h-auto md:w-44 md:rounded-none md:rounded-s-3xl" src="https://lp-cms-production.s3.amazonaws.com/public/2021-06/shutterstockRF_517093306.jpg" alt="" />
                            <div className="flex flex-col p-10 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wat Arun</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Wat Arun is the missile-shaped temple that rises from the Chao Phraya River's banks.</p>
                            </div>
                        </a>

                        <a href="#" className="flex flex-col items-center bg-white border-2 border-gray-200 rounded-3xl hover:shadow-lg md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-full rounded-t-xl  h-72 md:h-auto md:w-44 md:rounded-none md:rounded-s-3xl" src="https://lp-cms-production.s3.amazonaws.com/public/2021-06/shutterstockRF_517093306.jpg" alt="" />
                            <div className="flex flex-col p-10 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wat Arun</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Wat Arun is the missile-shaped temple that rises from the Chao Phraya River's banks. Known as Temple of Dawn, it was named after the Indian god of dawn, Arun. It was here that, after the destruction of Ayuthaya, King Taksin stumbled upon a small local shrine and interpreted the discovery as an auspicious sign that this should be the site of the new capital of Siam.</p>
                            </div>
                        </a>


                        <nav aria-label="Page navigation example">
                            <ul className="flex items-center -space-x-px h-8 text-sm">
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
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
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>


            </div>


        </Layout>
    );
}




