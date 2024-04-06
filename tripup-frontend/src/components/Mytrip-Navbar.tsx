export default function Navbar() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-0">
                <h1 className="mb-8 text-2xl md:text-3xl tracking-tight font-medium text-gray-900 dark:text-white">My Trip</h1>
                <div className="">
                <input
                    type="search"
                    placeholder="Search for a city"
                    className="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-[#98DB2E] focus:border-[#98DB2E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
            </div>
            </div>
        </section>
    );
}