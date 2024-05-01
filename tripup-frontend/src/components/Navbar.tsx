

import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { Modal } from 'flowbite-react';

import { auth, provider } from '../firebase';
import { User, signInWithPopup, signOut } from "firebase/auth";


export default function Navbar() {

    const [user, setUser] = useState<User | null>(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                setUser(user);
            } else {
                // No user is signed in.
                setUser(null);
            }
        });

        // Clean up subscription
        return () => unsubscribe();
    }, []);



    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }

    const SignInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // You can redirect the user to another page or update the UI accordingly
                setOpenLogin(false);
                navigate('/mytrip');
            })
            .catch((error) => {
                // Handle Errors here.
                //const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                // You can show error messages to users here
            });
    };

    return (
        <>

            <div className="sticky top-0 min-h-full">
                <Disclosure as="nav" className=" bg-black">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-screen-xl py-1 sm:py-1 px-6 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <a href="/" className="flex items-center ">
                                            <svg className="mr-3 h-10 sm:h-9" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                            <span className="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TripUp</span>
                                        </a>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4 font-normal">
                                                {/* {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-[#98DB2E] text-black'
                                                                : 'text-white hover:bg-[#98DB2E] hover:text-black',
                                                            'rounded-lg w-20 text-center  py-2  font-normal'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))} */}

                                                <Link to="/" className={'text-white hover:bg-[#98DB2E] hover:text-black rounded-lg w-20 text-center  py-2  font-normal'} >
                                                    Home
                                                </Link>
                                                <Link to="/discover" className={'text-white hover:bg-[#98DB2E] hover:text-black rounded-lg w-20 text-center  py-2  font-normal'} >
                                                    Discover
                                                </Link>
                                                <Link to="/explore" className={'text-white hover:bg-[#98DB2E] hover:text-black rounded-lg w-20 text-center  py-2  font-normal'} >
                                                    Explore
                                                </Link>
                                                {user ? (
                                                    <Link to={"/mytrip"} className={'text-white hover:bg-[#98DB2E] hover:text-black rounded-lg w-20 text-center  py-2  font-normal'} >
                                                        My Trip
                                                    </Link>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button> */}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    {user ? (
                                                        <Menu.Button className="relative flex gap-3 items-center rounded-xl text-white max-w-xs border  p-2 border-gray-600 hover:border-white   md:mr-0 text-sm ">
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">Open user menu</span>
                                                            <img className="h-8 w-8 rounded-lg" src={user.photoURL || '/src/assets/no-image.jpg'} alt="" />{user.displayName}
                                                        </Menu.Button>
                                                    ) : (
                                                        <button onClick={() => setOpenLogin(true)} className="text-gray-800 bg-[#98DB2E] dark:text-white  hover:bg-[#99db2eca]  font-medium rounded-lg text-sm px-4 lg:px-5 py-3.5 lg:py-2.5 lg:my-1 mr-2 dark:hover:bg-gray-700 ">Sign in</button>
                                                    )}
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200">
                                                        <div className='p-1'>
                                                            <Menu.Item >
                                                                <button
                                                                    onClick={() => setOpenProfile(true)}
                                                                    className={'bg-white rounded-md hover:bg-gray-200 w-full block px-4 py-2 text-sm text-black'}
                                                                >
                                                                    Profile
                                                                </button>
                                                            </Menu.Item>
                                                        </div>
                                                        <div className='p-1'>
                                                            <Menu.Item >
                                                                <button
                                                                    onClick={handleSignOut}
                                                                    className={'bg-white rounded-md hover:bg-gray-200 w-full block px-4 py-2 text-sm text-black'}
                                                                >
                                                                    Sign Out
                                                                </button>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 bg-black  ring-2 ring-white text-white hover:bg-white hover:text-black ">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                {user ? (
                                    <Disclosure>
                                        <Disclosure.Button as="a" className=" mx-4 mt-3 py-4 px-4 flex justify-between items-center ring-1 ring-gray-500 hover:ring-white  rounded-3xl">

                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="h-14 w-14 rounded-xl" src={user.photoURL || ""} alt="" />
                                                </div>
                                                <div className="ml-3 space-y-1">
                                                    <div className="text-base font-medium leading-none text-white">{user.displayName}</div>
                                                    {/* <div className="text-sm font-medium leading-none text-gray-400">{uuser.email}</div> */}
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 text-white ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>

                                        </Disclosure.Button>
                                        <Disclosure.Panel className=" px-4 pt-1 pb-1 ">
                                            {/* <div className='py-3'>
                                                <Disclosure.Button
                                                    onClick={() => console.log('Profile')}
                                                    as="a"
                                                    className="block rounded-xl px-5 py-4 text-lg font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                                >
                                                    Profile
                                                </Disclosure.Button>
                                            </div> */}
                                            <div className='py-3 '>
                                                <Disclosure.Button
                                                    onClick={handleSignOut}
                                                    as="a"
                                                    // className="block rounded-xl px-5 py-4 text-lg font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                                    className="block rounded-2xl px-5 py-4 text-lg font-semibold ring-1 ring-white text-white hover:bg-white hover:text-black"
                                                >
                                                    Sign Out
                                                </Disclosure.Button>
                                            </div>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                ) : null}

                                <div className=" px-4 pb-0 pt-0 sm:px-3 divide-y divide-gray-500 ">
                                    {/* {navigation.map((item) => (
                                        <div className='py-3'>
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-[#98DB2E] text-black' : 'text-white hover:bg-[#98DB2E] hover:text-black',
                                                    'block rounded-xl px-5 py-4 text-lg font-semibold '
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                    ))} */}
                                    <div className='py-3'>
                                        <Link
                                            to="/"
                                            className="block rounded-xl px-5 py-4 text-lg font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                        >
                                            Home
                                        </Link>
                                    </div>
                                    <div className='py-3'>
                                        <Link
                                            to="/discover"
                                            className="block rounded-xl px-5 py-4 text-lg font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                        >
                                            Discover
                                        </Link>
                                    </div>
                                    <div className='py-3'>
                                        <Link
                                            to="/explore"
                                            className="block rounded-xl px-5 py-4 text-lg font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                        >
                                            Explore
                                        </Link>
                                    </div>
                                    {user ? (
                                        <>
                                            <div className='py-3'>
                                                <Link
                                                    to="/mytrip"
                                                    className="block rounded-xl px-5 py-4 text-lg font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                                >
                                                    Mytrip
                                                </Link>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                                {!user ? (
                                    <div className='pb-5'>
                                        <Disclosure>
                                            <Disclosure.Button
                                                as="a"
                                                className="flex justify-between items-center rounded-3xl my-3 mx-4 px-5 py-5 text-lg font-semibold text-white hover:ring-white ring-1 ring-gray-500"
                                            >
                                                Sign In
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9  ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>

                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mx-4 mt-4  ">

                                                <button onClick={SignInWithGoogle} type="button" className=" w-full flex items-center justify-center text-white  ring-1 ring-white focus:outline-none bg-black hover:bg-white hover:text-black font-medium rounded-2xl text-sm px-5 py-4 my-3  ">
                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                    </svg>

                                                    Sign in with Google
                                                </button>
                                                <button type="button" disabled className=" cursor-not-allowed w-full flex items-center justify-center text-white  ring-1 ring-white focus:outline-none hover:bg-white hover:text-black  font-medium rounded-2xl text-sm px-5 py-4   ">
                                                    {/* <svg className="mr-2 text-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                                        <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                                                    </svg> */}
                                                    <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                                    </svg>
                                                    Sign in with Facebook
                                                </button>

                                            </Disclosure.Panel>
                                        </Disclosure>
                                    </div>
                                ) : null}



                                {/* <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3 space-y-1">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>

                                    </div>
                                    <div className="mt-3 space-y-1 px-3 divide-y divide-white">
                                        <div className='p-3'>
                                            <Disclosure.Button
                                                as="a"
                                                onClick={() => console.log('Profile')}
                                                className="block rounded-xl px-5 py-4 text-base font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                            >
                                                Profile
                                            </Disclosure.Button>
                                        </div>
                                        <div className='p-3'>
                                            <Disclosure.Button
                                                as="a"
                                                onClick={handleSignOut}
                                                className="block rounded-xl px-5 py-4 text-base font-semibold text-white hover:bg-[#98DB2E] hover:text-black"
                                            >
                                                Sign Out
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div> */}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                {/* login modal */}
                <Modal show={openLogin} className='bg-black' size="sm" position="center" onClose={() => setOpenLogin(false)} popup dismissible>
                    <Modal.Header ></Modal.Header>
                    <Modal.Body>
                        <h1 className='text-center mb-10 text-2xl font-medium text-black'>Sign In</h1>
                        <div className=" flex flex-col items-center">
                            <button onClick={SignInWithGoogle} type="button" className=" w-60 flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-3  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>

                                Sign in with Google
                            </button>
                            <button type="button" disabled className=" cursor-not-allowed w-60 flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 mb-5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                                </svg>
                                Sign in with Facebook
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* setting modal */}
                <Modal dismissible show={openProfile} className='bg-black ' size="3xl" position="center" onClose={() => setOpenProfile(false)} >
                    <Modal.Header className="py-5 px-10 ">
                        <h1 className="text-3xl font-medium">Profile</h1>
                    </Modal.Header>
                    <Modal.Body className="mx-5">
                        <div className='mb-10 '>
                            <h1 className='text-3xl font-semibold'>
                                Hi, {user?.displayName}
                            </h1>
                            <p className='mt-2 text-xl text-gray-500 dark:text-gray-400'>
                                {user?.email}
                            </p>
                        </div>
                        <form action="#">
                            <div className="flex gap-10 ">
                                <div className=" ">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Name</label>
                                    <input type="text" name="name"  defaultValue={user?.displayName || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#98DB2E] focus:border-[#98DB2E] block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Profile name" />
                                </div>

                                <div className=" items-center content-center space-y-4 ">
                                    <div className="flex items-center justify-center w-full ">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center   cursor-pointer   ">
                                            <div className=" text-center text-gray-500 dark:text-gray-400 hover:brightness-50">
                                                <img className="mx-auto ring-1 ring-gray-300 w-52 h-52 rounded-2xl" src={user?.photoURL || ""} alt="" />
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center mt-10  border-gray-200  dark:border-gray-600">
                                <button type="submit" className="text-black bg-[#98DB2E] hover:bg-[#99db2eca]  font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button onClick={() => setOpenProfile(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div >
        </>
    )
}