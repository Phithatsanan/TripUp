


export default function Discover() {
    return (
        <>
            
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6 ">
                        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-0">
                            <h1 className="mb-8 text-2xl tracking-tight font-medium text-gray-900 dark:text-white">Search your favorite destinations !</h1>
                            <form className="max-w-md mx-auto">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <input type="search" id="default-search" className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-[#98DB2E] focus:border-[#98DB2E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your destination" required />
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
            
        </>
    );
}