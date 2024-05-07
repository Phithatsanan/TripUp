import Layout from "./Layout";
import { SetStateAction, useState, useEffect } from "react";
import { Modal } from 'flowbite-react';
import { Link, useParams } from "react-router-dom";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export default function Destination() {

    const [activeTab, setActiveTab] = useState('adventure');
    const [openModal, setOpenModal] = useState(false);
    const handleTabClick = (tab: SetStateAction<string>) => {
        setActiveTab(tab);
    };
    const params = useParams();

    const [city, setCity] = useState<any[]>([]);


    async function getCity() {
        try {

            const cityColletionRef = collection(db, 'Cities');
            const data = query(cityColletionRef, where('city_id', '==', params.city_id));
            // Fetch data from Firestore only if the user is authenticated
            const unsubscribe = onSnapshot(data, querysnapshot => {
                const fetchedCity = querysnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCity(fetchedCity); // Update the type of the trip state
                console.log(fetchedCity);
                console.log(city);
            });

            // Cleanup subscription
            return () => unsubscribe();

        } catch (err) {
            console.error("Error fetch city from Cities collection:", err);
        }
    }

    useEffect(() => {
        getCity()
    }, []);


    return (
        <Layout>

            {city.map((city) => (
                <>
                    <nav className="flex px-10 py-3 " aria-label="Breadcrumb">
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
                                    <Link to="/discover" className="ms-1 text-sm font-medium text-black hover:text-[#98DB2E] md:ms-2 dark:text-gray-400 dark:hover:text-white">Discover</Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-extrabold text-black md:ms-2 dark:text-gray-400">{city.city_name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </>
            ))}

            {city.map((city) => (
                <>
                    <div className="h-60 bg-no-repeat bg-center bg-cover " style={{backgroundImage: `url(${city.city_image})`}}>
                    </div>

                    <section className="bg-white dark:bg-gray-900">
                        <div className="md:py-8 p-6 md:px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="font-semibold text-md">YOUR ESSENTIAL GUIDE TO</span>
                            </div>
                            <h2 className="mb-5 text-7xl md:text-8xl font-medium tracking-tight text-black dark:text-white">{city.city_name}</h2>
                            <p className="text-justify mb-5 text-lg font-light text-black dark:text-gray-400">{city.city_info}</p>
                        </div>
                    </section>
                </>
            ))}
            <div className="py-12 md:py-16 bg-black ">
                {city.map((_city) => (
                    <h1 className="mb-5 mx-10 md:mx-24 text-2xl md:text-3xl text-center tracking-tight font-medium text-white ">Things to do in Thailand</h1>
                ))}
                
                
                    <div className="text-sm font-medium text-center items-center text-white">
                    <ul className="flex justify-center flex-wrap items-center -mb-px">
                        <li className="me-2">
                            <button className={`inline-block p-4 border-b-2 border-transparent  ${activeTab === 'adventure' ? 'text-[#98DB2E] border-b-[#98DB2E] ' : 'hover:text-[#98DB2E] hover:border-[#98DB2E] '}`} onClick={() => handleTabClick('adventure')}>Adventure</button>
                        </li>
                        <li className="me-2">
                            <button className={`inline-block p-4 border-b-2 border-transparent  ${activeTab === 'leisure' ? 'text-[#98DB2E] border-b-[#98DB2E]' : 'hover:text-[#98DB2E] hover:border-[#98DB2E]'}`} onClick={() => handleTabClick('leisure')}>Leisure</button>
                        </li>
                        <li className="me-2">
                            <button className={`inline-block p-4 border-b-2 border-transparent  ${activeTab === 'entertainment' ? 'text-[#98DB2E] border-b-[#98DB2E]' : 'hover:text-[#98DB2E] hover:border-[#98DB2E]'}`} onClick={() => handleTabClick('entertainment')}>Entertainment</button>
                        </li>
                        <li className="me-2">
                            <button className={`inline-block p-4 border-b-2 border-transparent  ${activeTab === 'family' ? 'text-[#98DB2E] border-b-[#98DB2E]' : 'hover:text-[#98DB2E] hover:border-[#98DB2E]'}`} onClick={() => handleTabClick('family')}>Family</button>
                        </li>
                        <li className="me-2">
                            <button className={`inline-block p-4 border-b-2 border-transparent ${activeTab === 'food' ? 'text-[#98DB2E] border-b-[#98DB2E]' : 'hover:text-[#98DB2E] hover:border-[#98DB2E]'}`} onClick={() => handleTabClick('food')}>Food</button>
                        </li>
                    </ul>
                    
                    
                    {/* Render content based on active tab */}
                    {activeTab === 'adventure' && <div className=" overflow-x-auto  py-10 px-10">
                        {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                        <div className="grid grid-rows-1 grid-flow-col gap-8 mx-0">
                        
                   
                             <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237481195965513858/image.png?ex=663bcdac&is=663a7c2c&hm=e92aa2e630eace83f47c18eacb7fd357c6ce1c6158196e34976fb1740ac71c92&=&format=webp&quality=lossless" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Rajadamnern Muay Thai Stadium</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237479673164861480/image.png?ex=663bcc41&is=663a7ac1&hm=b957cec63919efb878887efdf35417ec84c26ecb5d3e31c6c704b0f86e8cd079&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Wat Pak Nam</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237491210143137813/image.png?ex=663bd6ff&is=663a857f&hm=97f017be38d5fbde132a04a08982a44536b7450cd957f617f602b6ca77eeee6f&=&format=webp&quality=lossless&width=857&height=479" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Scuba Diving</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237491537336602726/image.png?ex=663bd74d&is=663a85cd&hm=c07057b4d0d3166583b053238bc40c751610ab253d5ed606e426345f7130ebd8&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Jungle Coaster Adventure Park</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237486063237202112/image.png?ex=663bd234&is=663a80b4&hm=4279e229e34020734a78a9ec57b5eaa12eb13b864882bf34ac95b4f63023b83e&=&format=webp&quality=lossless" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Chao Phraya River Tour</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237486592906625105/image.png?ex=663bd2b3&is=663a8133&hm=252e46b8b6610e6d2c16332838d4dce5aff1f6fdb36b6562a6906fe0b662befe&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Chatuchak Weekend Market</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://lp-cms-production.imgix.net/2022-10/GettyImages-902426136.jpg?auto=format&w=1440&h=810&fit=crop&q=75" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Khaosan Road</figcaption>
                                </a>
                            </div>
                        </div>
                        
                    </div>}
                    
                    
                    {activeTab === 'leisure' && <div className=" overflow-x-auto  py-10 px-10">
                        {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                        <div className=" grid grid-rows-1 grid-flow-col gap-8 mx-0   ">
                        
                   
                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237484723194953808/image.png?ex=663bd0f5&is=663a7f75&hm=379ba83af3b89b1e5ffb669189aba6b168b2a7d410191aa1f4ff6e1450534fc2&=&format=webp&quality=lossless" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Benchakitti Forest Park</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237485433349476452/image.png?ex=663bd19e&is=663a801e&hm=40c42e506f76602563d246ed598b84ec11ba952c4243f04cdc03c79ce2380e0d&=&format=webp&quality=lossless" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">ICON Siam</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237492237072465970/image.png?ex=663bd7f4&is=663a8674&hm=0b82ca52e1a80ed247b2f96d6ee077c95bdf60a12f9349c995e1c5ba2b658852&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Siam Paragon</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237493022560882708/image.png?ex=663bd8b0&is=663a8730&hm=fb85dac7870eca20f3920465982c6138915882027f577254f8dade52c866af28&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Lumpini Park</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237494193501372427/image.png?ex=663bd9c7&is=663a8847&hm=ce731340da54ddf5d42e30048cb29a914918149e47c3951f739d8b8a01515043&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Andamanda Phuket</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237494704883368026/image.png?ex=663bda41&is=663a88c1&hm=61b5851bc9d84198ee24e894b9fdc03fef6fd401aa7657b5d7a061d0ba906e4b&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Vana Nava Water Jungle</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237495126239219925/image.png?ex=663bdaa5&is=663a8925&hm=95f6256bf3db9b619211535fc79336a66b837fee628ff8f9f933885ad51d0059&=&format=webp&quality=lossless&width=851&height=480" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Khao Kheow Open Zoo</figcaption>
                                </a>
                            </div>
                        </div>
                        
                    </div>}
                    
                    {activeTab === 'entertainment' && <div className=" overflow-x-auto  py-10 px-10">
                        {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                        <div className=" grid grid-rows-1 grid-flow-col gap-8 mx-0   ">
                        
                   
                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237500506944049293/image.png?ex=663bdfa8&is=663a8e28&hm=4c7741a21c09790580a5120da82a65a0634e07e982929d146eac7382ce20fe7e&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Dream World</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237500025437945907/image.png?ex=663bdf35&is=663a8db5&hm=e5b241ac6b3d7f80c800f9533fe696b2132d2d05c6c31216e8c0c98c72e46882&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Siam Amazing Park</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237499443046125662/image.png?ex=663bdeaa&is=663a8d2a&hm=f0f9d63027eb3ec471e819742615b48641a073b4636580108798e5f3c059a10a&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Sea Life Bangkok</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://media.discordapp.net/attachments/892018875338719273/1237498384613642360/image.png?ex=663bddae&is=663a8c2e&hm=f3fa981a674c599b6e643c73939534066501d9ab57034b42f16963a7dc65dbe3&=&format=webp&quality=lossless&width=854&height=480" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Big Mountain</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237498027837489253/image.png?ex=663bdd59&is=663a8bd9&hm=683350293b52386c222a73e573c3c48547b760c73e764c6440b9c88e82660cf5&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Full Moon Party</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237497323861573773/image.png?ex=663bdcb1&is=663a8b31&hm=077f31048456b1ebbe3eedcf18378e90e16f41391b8ebca4bf81a2886e93d059&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">The Rink Ice Arena</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237497742620885002/image.png?ex=663bdd15&is=663a8b95&hm=2892fd99dff235a008c38c241252a8b9c43eb8dbcac3f0ddd02dd2d1b9a9e103&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Ice Magic: Fantasy on Ice</figcaption>
                                </a>
                            </div>
                        </div>
                        
                    </div>}

                    {activeTab === 'family' && <div className=" overflow-x-auto  py-10 px-10">
                        {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                        <div className=" grid grid-rows-1 grid-flow-col gap-8 mx-0   ">
                        
                   
                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237502051177463869/image.png?ex=663be118&is=663a8f98&hm=c2cee8cead6415043df77ad1914cc3f09605e33d9b72e1224a721aa546231864&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">The Grand Palace</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237502348369199194/image.png?ex=663be15f&is=663a8fdf&hm=c0224db1275fc439c0610f777cf814f7f8167873ef4184cc1e1693c7ee136825&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Wat Arun</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237504696512680017/image.png?ex=663be38f&is=663a920f&hm=a7eea89cfdee2f2d7e30108e90fbf8447ba5b51c952636237ac7da72ff5b2376&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Wat Phra Chetuphon</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237505018186436658/image.png?ex=663be3dc&is=663a925c&hm=9ead38bfbc7028c7935dc18f1493101b228ad8c9772802343f075b3a6b0172c5&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Khao Yai National Park</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237505352564477982/image.png?ex=663be42b&is=663a92ab&hm=0d49b114334fe55a0334518ec7981c9684de890edf689eb41b847c467fae5dff&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Asiatique The Riverfront</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237505813740912761/image.png?ex=663be499&is=663a9319&hm=ba2e1258d41a35b139de1e54760d64da7388770e2ecc41c25a3b6b8f64776e63&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Chatuchak Weekend Market</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237506567046303814/image.png?ex=663be54d&is=663a93cd&hm=0373379b99b463c547dfded39bc5cc5521a491058aa8ebad2320b66b186672f4&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Pak Khlong Talat</figcaption>
                                </a>
                            </div>
                        </div>
                        
                    </div>}
                    {activeTab === 'food' && <div className=" overflow-x-auto  py-10 px-10">
                        {/* <div className=" grid grid-cols-5 gap-6 mx-0   "> */}
                        <div className=" grid grid-rows-1 grid-flow-col gap-8 mx-0   ">
                        
                   
                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237508763246919821/image.png?ex=663be758&is=663a95d8&hm=d712111ec46d1f5150183aab2d68834664e51b0dce3d3fc38149145b22497509&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Thai Papaya Salad</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237509519878262795/image.png?ex=663be80d&is=663a968d&hm=9d9ab927f9f9dff1084f9ff5aeffb40fe84baffb861d1fc9626d849f4612dd70&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Tom Yum Gung</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237509850498338816/image.png?ex=663be85c&is=663a96dc&hm=20bc56c8573d70997c1118409aa3ce12e042d9d75a6e272b198fe94d3bdac093&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Gang Som</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237510187552604260/image.png?ex=663be8ac&is=663a972c&hm=a45ba78adea4c6b3895a93290c6948759f8f5fe74ac0cd4172bbd626bb39454d&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Gang Keow Wan</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237510456864931900/image.png?ex=663be8ec&is=663a976c&hm=6092b92766e60491227950029c6a4bd82399d6826a09c1e400f8019510023802&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Panang Gai</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237510818208288970/image.png?ex=663be942&is=663a97c2&hm=4f6adb3598166ce499f97cb137efe67de65b9905672d36cf05e6b68a74fd6f8c&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Gang Massaman</figcaption>
                                </a>
                            </div>

                            <div className="w-60 items-center  hover:brightness-50">
                                <a href="#" className="block">
                                    <img className=" rounded-full " src="https://cdn.discordapp.com/attachments/892018875338719273/1237511179388190760/image.png?ex=663be999&is=663a9819&hm=2de990e0d34a76d32e95cb852c521c032d38b4f2b00cf192eda1077f2d0b7329&" alt="" />
                                    <figcaption className="mt-4 text-md text-center text-white">Gang Jued</figcaption>
                                </a>
                            </div>
                        </div>
                        
                    </div>}

                </div>

                
            </div>

            <div className="py-12 md:py-16 ">
                {city.map((_city) => (
                    <h1 className="mx-10 md:mx-24 text-2xl md:text-3xl tracking-tight font-medium text-black ">Best 3 Places to Visit in Thailand</h1>
                ))}
                <div className=" py-10 md:py-16 px-10 md:px-32">
                    <div className=" grid grid-cols-1 gap-8 mx-0   ">
                
                        <button onClick={() => setOpenModal(true)} className="flex flex-col items-center bg-white border-2 border-gray-200 rounded-3xl hover:shadow-lg md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-full rounded-t-xl  h-72 md:h-auto md:w-44 md:rounded-none md:rounded-s-3xl" src="https://cdn.discordapp.com/attachments/892018875338719273/1237512894653137004/image.png?ex=663beb31&is=663a99b1&hm=ae04111b37480e2258833df17aaaad541588d29f1e7462889b393fdf22c1762a&" alt="" />
                            <div className="flex flex-col  p-10 leading-normal">
                                <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">Chiang Mai</h5>
                                <p className=" text-justify font-normal text-gray-700 dark:text-gray-400">#1 in Best Places to Visit in Thailand
Chiang Mai in northern Thailand is a welcome reprieve from the commotion of Bangkok. Here, you'll be treated to beautiful, mountainous landscapes and an Old City full of historical temples, such as Wat Phra Singh and Wat Chedi Luang. Venture outside of the city to Doi Suthep temple for sweeping views of the city below. Night markets are also a must-do in Chiang Mai, so pencil in time for the Chiang Mai Night Bazaar (one of Thailand's oldest and most well-known night bazaars). And no matter what, leave time for a visit to Elephant Nature Park for some rest and relaxation with Thailand's gentle giants.</p>
                            </div>
                        </button>
                    
                    
                        <button onClick={() => setOpenModal(true)} className="flex flex-col items-center bg-white border-2 border-gray-200 rounded-3xl hover:shadow-lg md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-full rounded-t-xl  h-72 md:h-auto md:w-44 md:rounded-none md:rounded-s-3xl" src="https://lp-cms-production.s3.amazonaws.com/public/2021-06/shutterstockRF_517093306.jpg" alt="" />
                            <div className="flex flex-col  p-10 leading-normal">
                                <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">Bangkok</h5>
                                <p className=" font-normal text-justify text-gray-700 dark:text-gray-400">#2 in Best Places to Visit in Thailand
Thailand's capital city is nothing short of exhilarating. The city offers a hearty mix of big-city bustle and modern sights, such as the Jim Thompson House, alongside ancient attractions, including Wat Arun, Wat Pho and the Grand Palace. Just don't forget to pack modest clothing for visits to sacred sites, or you won't be admitted. While here, be sure to visit the Chatuchak Weekend Market – one of the largest street markets in the world – and eat at some of Bangkok's more than 300,000 street food stalls (some Michelin starred). At night, take in the skyline by exploring the rooftop bar scene.</p>
                            </div>
                        </button>
                    
                        <button onClick={() => setOpenModal(true)} className="flex flex-col items-center bg-white border-2 border-gray-200 rounded-3xl hover:shadow-lg md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img className="object-cover w-full rounded-t-xl  h-72 md:h-auto md:w-44 md:rounded-none md:rounded-s-3xl" src="https://cdn.discordapp.com/attachments/892018875338719273/1237513250841825370/image.png?ex=663beb86&is=663a9a06&hm=a2837541c9ddbbe3cee4983fcd1eb937679efbe945f774e2c3b9bbd4ba6a4eec&" alt="" />
                            <div className="flex flex-col  p-10 leading-normal">
                                <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">Phuket</h5>
                                <p className=" font-normal text-justify text-gray-700 dark:text-gray-400">#3 in Best Places to Visit in Thailand
Phuket is the largest island in Thailand and also the most popular with travelers. The island draws visitors in with its many palm-fringed beaches and relatively low travel costs, including everything from food to hotels. Hit up highly regarded Patong Beach, party the night away in the Patong district or head inland to Phuket Old Town to experience more local culture and find cheaper lodging options. Complete your once-in-a-lifetime trip by taking a long-tail boat tour to other islands in the area to swim, snorkel or scuba dive.</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* <nav aria-label="Page navigation example" className="flex justify-center">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
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
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav> */}
                
            </div>

            <Modal dismissible show={openModal} className='bg-black ' size="7xl" position="center" onClose={() => setOpenModal(false)} >
                <Modal.Header className="py-6 px-10">
                    <h1 className="text-4xl font-medium">Work In Process</h1>
                </Modal.Header>
            </Modal>
        </Layout >
    );
}