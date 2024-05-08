import MytripLayout from "./Mytrip-Layout"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Modal, Alert } from "flowbite-react";
import { formatDateRange, calculateDuration } from "../utils/DateRangeFormatter";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { arrayRemove } from "firebase/firestore";

import { collection, doc, deleteDoc, updateDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

import { Context } from "../auth/authcontext";

export default function Manage() {

    const [editTripModal, setEditTripModal] = useState(false);
    const [deleteTripModal, setDeleteTripModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const tripColletionRef = collection(db, 'Trip');

    const [editStartDate, setEditStartDate] = useState('');
    const [editEndDate, setEditEndDate] = useState('');
    const [editTripName, setEditTripName] = useState('');
    const [editTripDestination, setEditTripDestination] = useState('');
    const [editTripDate, setEditTripDate] = useState<any>('');
    const [editTripDuration, setEditTripDuration] = useState<any>('');


    const [trip, setTrip] = useState<any[]>([]);
    const [city, setCity] = useState<any[]>([]);

    // File Upload State
    const [imagePreview, setImagePreview] = useState('');
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    const params = useParams();
    const navigate = useNavigate()

    const confirmDeleteTrip = () => {
        deleteTrip();
        setDeleteTripModal(false);
        navigate("/mytrip");
    }

    const { user } = useContext(Context) as unknown as { user: any };

    useEffect(() => {
        const formattedDateRange = formatDateRange(editStartDate, editEndDate);
        const dateDuration = calculateDuration(editStartDate, editEndDate);
        setEditTripDate(formattedDateRange);
        setEditTripDuration(dateDuration);
    }, [editStartDate, editEndDate]);


    async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImagePreview(URL.createObjectURL(selectedImage));
            setImageUpload(selectedImage);
        }
    };

    async function onSubmitUpdateTrip(event: React.FormEvent) {
        event.preventDefault(); // Prevent default form submission

        if (!user) {
            console.error("User not authenticated."); // Log error if user is not authenticated
            return;
        } else {
            console.log(user);
        }

        try {
            let imageURL = ''; // Initialize imageURL variable

            if (imageUpload) {
                const imageFolderRef = ref(storage, `tripImageFile/${(imageUpload as File).name}`);
                await uploadBytes(imageFolderRef, imageUpload);
                imageURL = await getDownloadURL(imageFolderRef); // Get the URL of the uploaded image
            }

            const updatedTrip = {
                //trip_id: uuidv4(),
                //user_id: user.uid,
                trip_name: editTripName,
                trip_destination: editTripDestination,
                trip_date: editTripDate,
                start_date: editStartDate,
                trip_duration: editTripDuration,
                end_date: editEndDate,
                trip_image: imageURL, // Add imageURL to the newTrip object
                createdAt: serverTimestamp(),
                lastUpdate: serverTimestamp(),
            };

            const updatedTripRef = doc(tripColletionRef, params.trip_id);
            await updateDoc(updatedTripRef, updatedTrip);
            setEditTripModal(false);
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000);
        } catch (error) {
            console.error("Error updating trip:", error); // Log error if adding trip fails
        }
    }

    async function leaveTrip() {
        if (!params.trip_id) {
            console.error("Trip ID is undefined.");
            return;
        }

        try {
            const tripRef = doc(db, 'Trip', params.trip_id);
            await updateDoc(tripRef, {
                participants: arrayRemove(user.email)
            });
            navigate("/mytrip");
        } catch (error) {
            console.error("Failed to leave trip:", error);
        }
    }

    async function getCity() {
        try {
            if (user) {
                const cityColletionRef = collection(db, 'Cities');
                const data = query(cityColletionRef);
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
            }
        } catch (err) {
            console.error("Error fetch city from Cities collection:", err);
        }
    }

    async function getTrip() {
        try {
            if (user) {
                const data = query(tripColletionRef, where('trip_id', '==', params.trip_id));
                // Fetch data from Firestore only if the user is authenticated
                const unsubscribe = onSnapshot(data, querysnapshot => {
                    const fetchedTrip = querysnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setTrip(fetchedTrip); // Update the type of the trip state
                });

                // Cleanup subscription
                return () => unsubscribe();
            }
        } catch (err) {
            console.error(err);
        }
    }

    // {
    //     trip.map((trip) => (
    //         setEditTripName(trip.trip_name),
    //         setEditTripDestination(trip.trip_destination),
    //         setEditStartDate(trip.start_date),
    //         setEditEndDate(trip.end_date)
    //     ))
    // }


    useEffect(() => {
        getTrip(),
            getCity()
    }, [params.trip_id]);

    async function deleteTrip() {
        try {
            const deleteTripRef = doc(tripColletionRef, params.trip_id);
            await deleteDoc(deleteTripRef);
            //alert("Deleted Trip Successfully"); 
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <>
            <MytripLayout>

                {/* Breadcrumb page navbar */}
                <nav className="flex px-10 py-3 border-b " aria-label="Breadcrumb">

                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        {/* <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-black hover:text-[#98DB2E] dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li> */}
                        <li>
                            <div className="flex items-center">
                                {/* <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg> */}
                                <Link to="/mytrip" className="ms-1 text-sm font-medium text-black hover:text-[#98DB2E] md:ms-2 dark:text-gray-400 dark:hover:text-white">My Trip</Link>
                            </div>
                        </li>
                        {trip && trip.map((trip) => (
                            <li key={trip.trip_id} aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-extrabold  text-black md:ms-2 dark:text-gray-400">{trip.trip_name}</span>
                                </div>
                            </li>
                        ))}
                    </ol>

                </nav>
                {showSuccessAlert && (
                    <Alert color="success" className=" absolute inset-x-72 top-30 rounded-xl shadow-lg " onDismiss={() => setShowSuccessAlert(false)}>
                        <span className=" font-medium">Trip updated successfully!</span>
                    </Alert>
                )}

                {/* Trip content */}
                <div className="py-10">
                    <div className="mx-14">
                        {/* Trip heading module */}
                        <div className="flex flex-col items-center justify-between bg-white border-2 border-gray-300 rounded-3xl  md:flex-row md:max-w-full mb-10">
                            {trip && trip.map((trip) => (
                                <><div className="bg-clip-border flex flex-col px-12 py-6 leading-normal">

                                    <h5 key={trip.trip_id} className="mb-2 text-3xl text-left font-semibold tracking-tight text-gray-900 dark:text-white">{trip.trip_name}</h5>
                                    <h5 className="mb-2 text-lg text-left font-medium tracking-tight text-gray-900 dark:text-white">{trip.trip_destination}</h5>
                                    <h5 className="mb-4 text-md text-left font-normal tracking-tight text-gray-900 dark:text-white">{trip.trip_date}</h5>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditTripModal(true)} className="flex items-center text-gray-800 bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca]  font-medium rounded-lg text-sm w-30 px-4 lg:px-3.5 py-3.5 lg:py-2 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Edit Trip
                                        </button>
                                        <button onClick={() => setDeleteTripModal(true)} className="flex items-center text-white bg-red-600 dark:text-white hover:bg-red-500  font-medium rounded-lg text-sm w-30 px-4 lg:px-3.5 py-3.5 lg:py-2 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path fill-ƒrule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>
                                            Delete Trip
                                        </button>
                                        <button onClick={leaveTrip} className="flex items-center text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2-11a1 1 0 11-2 0 1 1 0 012 0zm-2 3a1 1 0 000 2h.01a1 1 0 000-2H10z" clipRule="evenodd" />
                                            </svg>
                                            Leave Trip
                                        </button>
                                    </div>

                                </div>
                                    <img className="  h-72 md:h-52 md:w-auto md:rounded-none md:rounded-r-3xl " src={trip.trip_image} alt="" />
                                </>
                            ))}
                        </div>




                        <div className="flex flex-row gap-5">

                            {/* Trip Day in details */}
                            <div className="flex flex-col gap-5 w-3/5">
                                <div>
                                    <div className="flex items-center justify-between border-t-2 border-x-2 border-gray-300 bg-[#98DB2E] py-3 px-6 w-full rounded-t-3xl">
                                        <h1 className="text-black font-semibold text-xl">Day 1</h1>
                                        <button onClick={() => setEditTripModal(true)} className=" flex items-center text-black bg-white dark:text-white hover:bg-black hover:text-white  font-medium rounded-lg text-sm w-30 px-3 py-1 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Edit Plan
                                        </button>
                                    </div>
                                    <div className="flex overflow-auto items-center bg-white border-x-2 border-b-2 border-gray-300 rounded-b-3xl  ">


                                        <table className="mb-5 w-full text-sm text-center text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3">Time</th>
                                                    <th scope="col" className="px-4 py-3">Duration</th>
                                                    <th scope="col" className="px-4 py-3">Destination</th>
                                                    <th scope="col" className="px-4 py-3">Location</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="hover:underline decoration-2 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>


                                            </tbody>

                                        </table>



                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between border-t-2 border-x-2 border-gray-300 bg-[#98DB2E] py-3 px-6 w-full rounded-t-3xl">
                                        <h1 className="text-black font-semibold text-xl">Day 2</h1>
                                        <button onClick={() => setEditTripModal(true)} className="flex items-center text-black bg-white dark:text-white hover:bg-black hover:text-white  font-medium rounded-lg text-sm w-30 px-3 py-1 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Edit Plan
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center justify-between bg-white border-x-2 border-b-2 border-gray-300 rounded-b-3xl  md:flex-row md:max-w-full ">
                                        <table className="mb-5 w-full text-sm text-center text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3">Time</th>
                                                    <th scope="col" className="px-4 py-3">Duration</th>
                                                    <th scope="col" className="px-4 py-3">Destination</th>
                                                    <th scope="col" className="px-4 py-3">Location</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>


                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between border-t-2 border-x-2 border-gray-300 bg-[#98DB2E] py-3 px-6 w-full rounded-t-3xl">
                                        <h1 className="text-black font-semibold text-xl">Day 3</h1>
                                        <button onClick={() => setEditTripModal(true)} className="flex items-center text-black bg-white dark:text-white hover:bg-black hover:text-white  font-medium rounded-lg text-sm w-30 px-3 py-1 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Edit Plan
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center justify-between bg-white border-x-2 border-b-2 border-gray-300 rounded-b-3xl  md:flex-row md:max-w-full ">
                                        <table className="mb-5 w-full text-sm text-center text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3">Time</th>
                                                    <th scope="col" className="px-4 py-3">Duration</th>
                                                    <th scope="col" className="px-4 py-3">Destination</th>
                                                    <th scope="col" className="px-4 py-3">Location</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                                <tr className="border-b dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">08:00 AM</th>
                                                    <td className="px-4 py-3">1 hr</td>
                                                    <td className="px-4 py-3">Cafe and Bar</td>
                                                    <td className="px-4 py-3"><a className="undeline underline-offset-1 text-blue-700" target="_blank" href="https://google.com">Google Maps</a></td>

                                                    {/* <td className="px-4 py-3 flex items-center justify-end">
                                                        <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>


                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>


                            {/* Direction module */}
                            <div className="w-2/5 flex flex-col">
                                <div className="flex items-center justify-between border-t-2 border-x-2 border-gray-300 bg-[#98DB2E] py-3 px-6 w-full rounded-t-3xl">
                                    <h1 className="text-black font-semibold text-xl">Directions</h1>
                                </div>
                                <div className="flex flex-col  bg-white border-x-2 border-b-2 border-gray-300 rounded-b-3xl  h-full ">

                                    {/* <div className="flex items-center justify-between border-2 border-gray-300 bg-[#98DB2E] py-3 px-6 w-full rounded-t-3xl">
                                        <h1 className="text-black font-semibold text-lg">Day 1</h1>
                                        <button onClick={() => setEditTripModal(true)} className="flex items-center text-black bg-white dark:text-white hover:bg-black hover:text-white  font-medium rounded-lg text-sm w-30 px-3 py-1 mr-2 dark:hover:bg-gray-700 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 me-2.5">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Edit Trip
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>





                    </div>
                </div>





                <Modal dismissible show={editTripModal} className='bg-black ' size="4xl" position="center" onClose={() => setEditTripModal(false)} >
                    <Modal.Header className="py-5 px-10 ">
                        <h1 className="text-3xl font-medium">Edit Plan</h1>
                    </Modal.Header>
                    <Modal.Body className="mx-5">
                        {trip.map((trip) => (
                            <form onSubmit={onSubmitUpdateTrip}>
                                <div className="grid grid-rows-3 grid-flow-col gap-5 ">
                                    <div className=" col-span-2">
                                        <label htmlFor="Trip name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Name</label>
                                        <input type="text" name="name" id="Trip name" defaultValue={trip.trip_name} onChange={(e) => setEditTripName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter trip name" />
                                    </div>
                                    <div className=" col-span-2">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trip Destination</label>
                                        <select id="category" defaultValue={trip.trip_destination} onChange={(e) => setEditTripDestination(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option >Select destination city</option>
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
                                                <input name="start" type="text" defaultValue={trip.start_date} onChange={(e) => setEditStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                                            </div>
                                            <span className="mx-4 text-gray-500">to</span>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                    </svg>
                                                </div>
                                                <input name="end" type="text" defaultValue={trip.end_date} onChange={(e) => setEditEndDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
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
                                    <button onClick={() => setEditTripModal(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                                </div>
                            </form>
                        ))
                        }
                    </Modal.Body>
                </Modal>

                <Modal show={deleteTripModal} size="md" onClose={() => setDeleteTripModal(false)} popup dismissible>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this Trip?
                            </h3>
                            <div className="flex justify-center gap-4">

                                <button onClick={confirmDeleteTrip} className="text-white bg-red-600 hover:bg-red-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{"Yes, I'm sure"}</button>
                                <button onClick={() => setDeleteTripModal(false)} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>

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