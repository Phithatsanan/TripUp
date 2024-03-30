import Layout from "./Layout";


export default function Discover() {
    return (
        <>
            <Layout>
                <section className=" bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6 ">
                        <div className=" mx-auto max-w-screen-sm text-center mb-8 lg:mb-0">
                            <h1 className="mb-8 text-2xl tracking-tight font-medium text-gray-900 dark:text-white">Search your favorite destinations !</h1>
                            <form className="max-w-md mx-auto">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <input type="search" id="default-search" className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-[#98DB2E] focus:border-[#98DB2E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your destination" />
                                    <button type="submit" className="flex items-center text-black absolute end-2.5 bottom-2.5 bg-[#98DB2E] hover:bg-[#99db2eca] font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="mr-2 w-3 h-3 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>

                <div className="py-16 bg-black ">
                    <h1 className="mx-24 text-3xl tracking-tight font-medium text-white ">Popular Cities to Explore</h1>

                    <div className=" overflow-x-auto py-10 px-10">
                        {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                        <div className=" grid grid-rows-2 grid-flow-col gap-6 mx-0   ">
                            <div className="w-60 items-center ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>

                            <div className=" w-60  hover:shadow-lg ">
                                <a href="#" className="block">
                                    <img className=" rounded-3xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Image caption</figcaption>
                                </a>
                            </div>







                        </div>
                    </div>
                </div>

                <div className="py-16 ">
                    <h1 className="mx-24 text-3xl tracking-tight font-medium text-black ">Best Destinations to Experience</h1>

                    <div className=" overflow-x-auto py-10 px-10">
                        <div className=" grid grid-rows-1 grid-flow-col gap-8 mx-0   ">

                            <div className=" w-72 bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                                <a href="#" className="block">
                                    <img className="rounded-t-2xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                    </div>
                                </a>
                            </div>

                            <div className=" w-72 bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                                <a href="#" className="block">
                                    <img className="rounded-t-2xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                    </div>
                                </a>
                            </div>

                            <div className=" w-72 bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                                <a href="#" className="block">
                                    <img className="rounded-t-2xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                    </div>
                                </a>
                            </div>

                            <div className=" w-72 bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                                <a href="#" className="block">
                                    <img className="rounded-t-2xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                    </div>
                                </a>
                            </div>

                            <div className=" w-72 bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                                <a href="#" className="block">
                                    <img className="rounded-t-2xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                    </div>
                                </a>
                            </div>

                            <div className=" w-72 bg-white border border-gray-300 rounded-2xl hover:shadow-xl ">
                                <a href="#" className="block">
                                    <img className="rounded-t-2xl" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className=" text-md font-medium tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
                                    </div>
                                </a>
                            </div>


                        </div>
                    </div>

                </div>





            </Layout>
        </>
    );
}