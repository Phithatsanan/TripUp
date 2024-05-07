import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert } from "flowbite-react";
import { formatDateRange, calculateDuration } from "../utils/DateRangeFormatter";
import { collection, doc, setDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { Context } from "../auth/authcontext";
import { v4 as uuidv4 } from 'uuid';
import MytripLayout from "./Mytrip-Layout";

export default function Mytrip() {
    const [openModal, setOpenModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tripName, setTripName] = useState('');
    const [tripDestination, setTripDestination] = useState('');
    const [tripDate, setTripDate] = useState<any>('');
    const [tripDuration, setTripDuration] = useState<any>('');

    const [userTrips, setUserTrips] = useState<any[]>([]); // Store trips created by the user
    const [joinedTrips, setJoinedTrips] = useState<any[]>([]); // Store trips joined by the user
    const [city, setCity] = useState<any[]>([]);

    const [imagePreview, setImagePreview] = useState('');
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    const { user } = useContext(Context) as unknown as { user: any };

    useEffect(() => {
        const formattedDateRange = formatDateRange(startDate, endDate);
        const dateDuration = calculateDuration(startDate, endDate);
        setTripDate(formattedDateRange);
        setTripDuration(dateDuration);
    }, [startDate, endDate]);

    async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImagePreview(URL.createObjectURL(selectedImage));
            setImageUpload(selectedImage);
        }
    };

    async function onSubmitAddNewTrip(event: React.FormEvent) {
        event.preventDefault();
        if (!user) {
            console.error("User not authenticated.");
            setOpenModal(false);
            return;
        } else {
            console.log(user);
        }

        try {
            let imageURL = '';
            if (imageUpload) {
                const imageFolderRef = ref(storage, `tripImageFile/${(imageUpload as File).name}`);
                await uploadBytes(imageFolderRef, imageUpload);
                imageURL = await getDownloadURL(imageFolderRef);
            }

            const newTrip = {
                trip_id: uuidv4(),
                user_id: user.uid,
                trip_name: tripName,
                trip_destination: tripDestination,
                trip_date: tripDate,
                trip_duration: tripDuration,
                start_date: startDate,
                end_date: endDate,
                trip_image: imageURL,
                createdAt: serverTimestamp(),
                lastUpdate: serverTimestamp(),
            };
            const tripCollectionRef = collection(db, 'Trip');
            const newTripRef = doc(tripCollectionRef, newTrip.trip_id);
            await setDoc(newTripRef, newTrip);
            setOpenModal(false);
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 5000);
        } catch (error) {
            console.error("Error adding trip:", error);
        }
    }

    async function getCity() {
        try {
            if (user) {
                const cityCollectionRef = collection(db, 'Cities');
                const data = query(cityCollectionRef);
                const unsubscribe = onSnapshot(data, querySnapshot => {
                    const fetchedCity = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setCity(fetchedCity);
                    console.log(fetchedCity);
                    console.log(city);
                });
                return () => unsubscribe();
            }
        } catch (err) {
            console.error("Error fetch city from Cities collection:", err);
        }
    }

    async function getUserTrips() {
        try {
            if (user) {
                const tripCollectionRef = collection(db, 'Trip');
                const data = query(tripCollectionRef, where('user_id', '==', user.uid));
                const unsubscribe = onSnapshot(data, querySnapshot => {
                    const fetchedTrips = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setUserTrips(fetchedTrips);
                    console.log(fetchedTrips);
                });
                return () => unsubscribe();
            }
        } catch (err) {
            console.error("Error fetching user's trips:", err);
        }
    }

    async function getJoinedTrips() {
        try {
            if (user) {
                const tripCollectionRef = collection(db, 'Trip');
                const data = query(tripCollectionRef, where('participants', 'array-contains', user.email));
                const unsubscribe = onSnapshot(data, querySnapshot => {
                    const fetchedTrips = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setJoinedTrips(fetchedTrips);
                    console.log(fetchedTrips);
                });
                return () => unsubscribe();
            }
        } catch (err) {
            console.error("Error fetching joined trips:", err);
        }
    }

    useEffect(() => {
        getUserTrips();
        getJoinedTrips();
        getCity();
    }, []);

    return (
        <>
            <MytripLayout>

                <div className="py-12 max-lg:hidden">
                    <div className="mx-24 flex flex-wrap justify-between items-center">
                        <h1 className="text-4xl tracking-tight font-semibold text-black">My Trip</h1>
                        {showSuccessAlert && (
                            <Alert color="success" className="absolute inset-x-72 top-30 rounded-xl shadow-lg" onDismiss={() => setShowSuccessAlert(false)}>
                                <span className="font-medium">Trip added successfully!</span>
                            </Alert>
                        )}
                        <button onClick={() => setOpenModal(true)} className="flex h-12 items-center text-black bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca] gap-2 font-medium rounded-xl text-sm px-5 py-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            New trip
                        </button>
                    </div>
                    <div className="py-12 px-10 md:px-32">
                        <div className=" grid grid-cols-1 gap-8 mx-0 ">
                            {(userTrips.length > 0) ? (userTrips.map((trip) => (
                                <Link key={trip.trip_id} to={`/mytrip/${trip.trip_id}`} className="flex flex-col items-center justify-between bg-white border-2 border-gray-300 rounded-3xl md:flex-row md:max-w-full hover:shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="bg-clip-border flex flex-col px-12 py-6 leading-normal">
                                        <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">{trip.trip_name}</h5>
                                        <h5 className="mb-2 text-lg text-left font-medium tracking-tight text-gray-900 dark:text-white">
                                            {trip.trip_destination}</h5>
                                        <h5 className="mb-0 text-md text-left font-normal tracking-tight text-gray-900 dark:text-white">{trip.trip_date}</h5>
                                    </div>
                                    <img className="h-72 md:h-44 md:w-auto md:rounded-none md:rounded-r-3xl" src={trip.trip_image} alt="" />
                                </Link>
                            ))) : (
                                <div className=" max-w-screen w-auto max-h-screen-sm h-auto p-10 sm:p-5 flex gap-10 justify-center items-center ">
                                    <svg className="mb-5 sm:mb-0 h-32 sm:h-40" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1_32)">
                                            <path d="M12.3994 19.165C12.3709 19.4892 12.1718 20.5898 10.8779 21.2154L10.8153 21.2439C10.5053 21.3861 10.1328 21.4885 9.70615 21.5482L9.60946 21.4742C9.57817 21.2581 9.56396 21.0562 9.56396 20.8713C9.56396 19.3698 10.474 18.7697 10.912 18.5706C11.3215 18.3801 11.6998 18.2749 11.9728 18.2749C12.1349 18.2749 12.1974 18.3118 12.2117 18.3232C12.3169 18.3971 12.442 18.7071 12.3994 19.165Z" fill="#98DB2E" />
                                            <path d="M32.8527 5.14745L19.6229 20.6694L19.6911 21.5027L22.0715 23.5304L22.9047 23.4621L31.6923 13.0137L31.7379 13.0307C31.8516 17.7516 31.0326 24.2726 23.4138 27.7763C20.5841 29.0788 17.7772 29.2352 15.2888 28.2285C13.9351 27.6796 12.6525 26.7554 11.6486 25.6093L11.6799 25.5097C12.0041 25.4102 12.3197 25.2936 12.6155 25.1571C14.9048 24.102 16.4661 21.9605 16.688 19.5631C16.87 17.5952 16.1277 15.8177 14.7029 14.8082C13.8299 14.1939 11.9472 13.3521 9.11183 14.6574C6.4727 15.8689 5.13607 18.4341 5.4489 21.6961C5.52 22.4355 6.36463 29.0134 13.6621 32.2156C15.5191 33.029 17.4444 33.356 19.2731 33.356C21.7473 33.356 24.0423 32.7617 25.76 31.971C29.9291 30.0543 32.8271 26.8293 34.8747 21.824C35.8899 19.3413 36.362 15.9059 36.0748 13.1672L36.1061 13.1502L41.8394 19.0313V20.951C41.8394 32.5228 32.4602 41.9048 20.8884 41.9048C10.3745 41.9048 1.66937 34.1608 0.164946 24.0679C0.528964 24.2243 0.921421 24.3978 1.34232 24.5883C2.12723 24.9438 3.01168 25.3647 3.98429 25.8681C4.06961 25.9136 4.16062 25.9335 4.25162 25.9335C4.39097 25.9335 4.53032 25.8823 4.63839 25.7856C4.8204 25.6235 4.88012 25.3704 4.78912 25.1457C4.50473 24.4091 4.55592 23.1777 4.90856 22.3416C5.01663 22.0885 5.01378 21.807 4.90572 21.5482C4.79765 21.2865 4.58151 21.0761 4.31703 20.9709C3.32736 20.5784 2.50831 20.2627 1.82862 20.0011C1.0494 19.7025 0.443647 19.4693 0 19.2816C0.403833 14.1597 2.64766 9.56117 6.07171 6.13712C9.86547 2.34337 15.1039 0 20.8884 0H41.8394V13.116L33.72 5.11048L32.8527 5.14745Z" fill="#98DB2E" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_32">
                                                <rect width="45" height="44" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="flex flex-col gap-3">
                                        <h1 className=" font-semibold text-3xl sm:text-4xl">Let's get on the TripUp together</h1>
                                        <button onClick={() => setOpenModal(true)} className="flex h-12 w-auto justify-center items-center  text-black bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca] gap-2 font-medium rounded-full text-lg px-5 py-2.5  ">
                                            Get on Now !
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="mx-24 flex flex-wrap justify-between items-center">
                        <h1 className="text-4xl tracking-tight font-semibold text-black">Joined Trip</h1>
                    </div><div className="py-12 px-10 md:px-32">
                        <div className="grid grid-cols-1 gap-4 mx-0">
                            {(joinedTrips.length > 0) ? (joinedTrips.map((trip) => (
                                <Link key={trip.trip_id} to={`/mytrip/${trip.trip_id}`} className="flex flex-col items-center justify-between bg-white border-2 border-gray-300 rounded-3xl md:flex-row md:max-w-full hover:shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="bg-clip-border flex flex-col px-12 py-6 leading-normal">
                                        <h5 className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">{trip.trip_name}</h5>
                                        <h5 className="mb-2 text-lg text-left font-medium tracking-tight text-gray-900 dark:text-white">
                                            {trip.trip_destination}</h5>
                                        <h5 className="mb-0 text-md text-left font-normal tracking-tight text-gray-900 dark:text-white">{trip.trip_date}</h5>
                                    </div>
                                    <img className="h-72 md:h-44 md:w-auto md:rounded-none md:rounded-r-3xl" src={trip.trip_image} alt="" />
                                </Link>
                            ))) : (
                                <div className=" max-w-screen w-auto max-h-screen-sm h-auto p-10 sm:p-5 flex gap-10 justify-center items-center ">
                                    <svg className="mb-5 sm:mb-0 h-32 sm:h-40" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1_32)">
                                            <path d="M12.3994 19.165C12.3709 19.4892 12.1718 20.5898 10.8779 21.2154L10.8153 21.2439C10.5053 21.3861 10.1328 21.4885 9.70615 21.5482L9.60946 21.4742C9.57817 21.2581 9.56396 21.0562 9.56396 20.8713C9.56396 19.3698 10.474 18.7697 10.912 18.5706C11.3215 18.3801 11.6998 18.2749 11.9728 18.2749C12.1349 18.2749 12.1974 18.3118 12.2117 18.3232C12.3169 18.3971 12.442 18.7071 12.3994 19.165Z" fill="#98DB2E" />
                                            <path d="M32.8527 5.14745L19.6229 20.6694L19.6911 21.5027L22.0715 23.5304L22.9047 23.4621L31.6923 13.0137L31.7379 13.0307C31.8516 17.7516 31.0326 24.2726 23.4138 27.7763C20.5841 29.0788 17.7772 29.2352 15.2888 28.2285C13.9351 27.6796 12.6525 26.7554 11.6486 25.6093L11.6799 25.5097C12.0041 25.4102 12.3197 25.2936 12.6155 25.1571C14.9048 24.102 16.4661 21.9605 16.688 19.5631C16.87 17.5952 16.1277 15.8177 14.7029 14.8082C13.8299 14.1939 11.9472 13.3521 9.11183 14.6574C6.4727 15.8689 5.13607 18.4341 5.4489 21.6961C5.52 22.4355 6.36463 29.0134 13.6621 32.2156C15.5191 33.029 17.4444 33.356 19.2731 33.356C21.7473 33.356 24.0423 32.7617 25.76 31.971C29.9291 30.0543 32.8271 26.8293 34.8747 21.824C35.8899 19.3413 36.362 15.9059 36.0748 13.1672L36.1061 13.1502L41.8394 19.0313V20.951C41.8394 32.5228 32.4602 41.9048 20.8884 41.9048C10.3745 41.9048 1.66937 34.1608 0.164946 24.0679C0.528964 24.2243 0.921421 24.3978 1.34232 24.5883C2.12723 24.9438 3.01168 25.3647 3.98429 25.8681C4.06961 25.9136 4.16062 25.9335 4.25162 25.9335C4.39097 25.9335 4.53032 25.8823 4.63839 25.7856C4.8204 25.6235 4.88012 25.3704 4.78912 25.1457C4.50473 24.4091 4.55592 23.1777 4.90856 22.3416C5.01663 22.0885 5.01378 21.807 4.90572 21.5482C4.79765 21.2865 4.58151 21.0761 4.31703 20.9709C3.32736 20.5784 2.50831 20.2627 1.82862 20.0011C1.0494 19.7025 0.443647 19.4693 0 19.2816C0.403833 14.1597 2.64766 9.56117 6.07171 6.13712C9.86547 2.34337 15.1039 0 20.8884 0H41.8394V13.116L33.72 5.11048L32.8527 5.14745Z" fill="#98DB2E" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_32">
                                                <rect width="45" height="44" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="flex flex-col gap-3">
                                        <h1 className=" font-semibold text-3xl sm:text-4xl">Let's explore more together</h1>
                                        <Link to={"/explore"} className="flex h-12 w-auto justify-center items-center  text-black bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca] gap-2 font-medium rounded-full text-lg px-5 py-2.5  ">
                                            Explore Now !
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                </div>



                {/* Add new trip modal */}
                <Modal dismissible show={openModal} className='bg-black ' size="4xl" position="center" onClose={() => setOpenModal(false)} initialFocus={nameInputRef}>
                    <Modal.Header className="py-5 px-10 ">
                        <h1 className="text-3xl font-medium">New Trip</h1>
                    </Modal.Header>
                    <Modal.Body className="mx-5">
                        <form onSubmit={onSubmitAddNewTrip}>
                            <div className="grid grid-rows-3 grid-flow-col gap-5 ">
                                <div className=" col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Name</label>
                                    <input type="text" name="name" id="name" ref={nameInputRef} onChange={(e) => setTripName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter trip name" />
                                </div>
                                <div className=" col-span-2">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Destination</label>
                                    <select id="category" onChange={(e) => setTripDestination(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option defaultValue="Select destination city">Select destination city</option>
                                        {city.map((city) => (
                                            <option value={city.city_name}>{city.city_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-2">


                                    <label htmlFor="startdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Duration <span className=" font-light text-xs text-red-600">[Fill in date as following format MM/DD/YYYY]</span></label>
                                    <div date-rangepicker="true" className="flex items-center ">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input name="start" type="text" onChange={(e) => setStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                                        </div>
                                        <span className="mx-4 text-gray-500">to</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input name="end" type="text" onChange={(e) => setEndDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row-span-3 col-span-12 items-center content-center space-y-4 ">
                                    <div className="flex items-center justify-center w-full ">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center   cursor-pointer   ">
                                            <div className=" text-center text-gray-500 dark:text-gray-400 hover:brightness-50">
                                                <img className="mx-auto ring-1 ring-gray-300 w-auto h-52 rounded-2xl" src={imagePreview || 'https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg'} alt="" />

                                            </div>
                                            <input id="dropzone-file" type="file" onChange={onImageChange} className="hidden" />
                                            {/* <button onClick={uploadTripImage} className="absolute bottom-28 text-black bg-[#98DB2E] hover:bg-[#99db2eca] font-normal rounded-lg text-xs px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change</button> */}
                                        </label>
                                    </div>
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
