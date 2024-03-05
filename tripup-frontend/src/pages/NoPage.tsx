import { Link } from "react-router-dom";

export default function NoPage() {
    return (
        <section className="bg-white dark:bg-gray-900 ">
    <div className="py-8 px-4 mx-auto  max-w-screen-xl lg:py-16 lg:px-6 ">
        <div></div>
        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg" className=" w-60 mx-auto" alt="" />
        <div className="mx-auto max-w-screen-sm text-center items-center ">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold  lg:text-9xl text- dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Page not found</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <Link to='/' className="inline-flex text-black bg-[#98DB2E] hover:bg-[#99db2eb8]  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
        </div>   
    </div>
</section>
    );
}
