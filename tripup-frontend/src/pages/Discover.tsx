import React, { useEffect, useState } from 'react';
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

type CityType = {
    city_name: string;
    city_image: string;
    city_id: string;
};

export default function Discover() {
    const [allCities, setAllCities] = useState<CityType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesSnapshot = await getDocs(collection(db, 'Cities'));
                const citiesData = citiesSnapshot.docs.map(doc => ({
                    city_id: doc.id,
                    ...doc.data(),
                })) as CityType[];
                setAllCities(citiesData);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);

    const filteredCities = searchTerm.trim()
        ? allCities.filter(city =>
            city.city_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
        : allCities;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Layout>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-0">
                            <h1 className="mb-8 text-2xl tracking-tight font-medium text-gray-900 dark:text-white">Search your favorite destinations!</h1>
                            <div className="relative">
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search for a city"
                                    className="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-[#98DB2E] focus:border-[#98DB2E] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="py-16 bg-black">
                    <h1 className="mx-24 text-3xl tracking-tight font-medium text-white">
                        {searchTerm ? `Results for "${searchTerm}"` : "Popular Cities to Explore"}
                    </h1>
                    {/* Set a max-height for the container to fit two rows and allow horizontal scrolling */}
                    <div className="overflow-x-auto py-10 px-10">
                        <div className="grid grid-rows-1 grid-flow-col gap-8 mx-0">
                            {filteredCities.length > 0 ? (
                                filteredCities.map((city) => (
                                    <div key={city.city_id} className="w-60 items-center hover:brightness-50">
                                        <Link to={`/destination/${city.city_name}`} className="block">
                                            <img
                                                className="rounded-full w-60 h-40 object-cover"
                                                src={city.city_image}
                                                alt={`View details about ${city.city_name}`}
                                            />
                                            <figcaption className="mt-4 text-md text-center text-white">
                                                {city.city_name}
                                            </figcaption>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white text-center w-full">No cities found. Try a different search.</p>
                            )}
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