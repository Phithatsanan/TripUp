'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Modal } from 'flowbite-react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function NavBar() {

    const [openModal, setOpenModal] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // You can redirect the user to another page or update the UI accordingly
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
            <header className='sticky top-0 '>
                <nav className=" bg-black border-gray-200 px-4 lg:px-6 py-5 sm:py-4 dark:bg-gray-800">
                    <div className=" flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="/" className="flex items-center ">
                            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
                            <svg className="mr-3 h-6 sm:h-9" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1_32)">
                                    <path d="M12.3994 19.165C12.3709 19.4892 12.1718 20.5898 10.8779 21.2154L10.8153 21.2439C10.5053 21.3861 10.1328 21.4885 9.70615 21.5482L9.60946 21.4742C9.57817 21.2581 9.56396 21.0562 9.56396 20.8713C9.56396 19.3698 10.474 18.7697 10.912 18.5706C11.3215 18.3801 11.6998 18.2749 11.9728 18.2749C12.1349 18.2749 12.1974 18.3118 12.2117 18.3232C12.3169 18.3971 12.442 18.7071 12.3994 19.165Z" fill="#98DB2E" />
                                    <path d="M32.8527 5.14745L19.6229 20.6694L19.6911 21.5027L22.0715 23.5304L22.9047 23.4621L31.6923 13.0137L31.7379 13.0307C31.8516 17.7516 31.0326 24.2726 23.4138 27.7763C20.5841 29.0788 17.7772 29.2352 15.2888 28.2285C13.9351 27.6796 12.6525 26.7554 11.6486 25.6093L11.6799 25.5097C12.0041 25.4102 12.3197 25.2936 12.6155 25.1571C14.9048 24.102 16.4661 21.9605 16.688 19.5631C16.87 17.5952 16.1277 15.8177 14.7029 14.8082C13.8299 14.1939 11.9472 13.3521 9.11183 14.6574C6.4727 15.8689 5.13607 18.4341 5.4489 21.6961C5.52 22.4355 6.36463 29.0134 13.6621 32.2156C15.5191 33.029 17.4444 33.356 19.2731 33.356C21.7473 33.356 24.0423 32.7617 25.76 31.971C29.9291 30.0543 32.8271 26.8293 34.8747 21.824C35.8899 19.3413 36.362 15.9059 36.0748 13.1672L36.1061 13.1502L41.8394 19.0313V20.951C41.8394 32.5228 32.4602 41.9048 20.8884 41.9048C10.3745 41.9048 1.66937 34.1608 0.164946 24.0679C0.528964 24.2243 0.921421 24.3978 1.34232 24.5883C2.12723 24.9438 3.01168 25.3647 3.98429 25.8681C4.06961 25.9136 4.16062 25.9335 4.25162 25.9335C4.39097 25.9335 4.53032 25.8823 4.63839 25.7856C4.8204 25.6235 4.88012 25.3704 4.78912 25.1457C4.50473 24.4091 4.55592 23.1777 4.90856 22.3416C5.01663 22.0885 5.01378 21.807 4.90572 21.5482C4.79765 21.2865 4.58151 21.0761 4.31703 20.9709C3.32736 20.5784 2.50831 20.2627 1.82862 20.0011C1.0494 19.7025 0.443647 19.4693 0 19.2816C0.403833 14.1597 2.64766 9.56117 6.07171 6.13712C9.86547 2.34337 15.1039 0 20.8884 0H41.8394V13.116L33.72 5.11048L32.8527 5.14745Z" fill="#98DB2E" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_32">
                                        <rect width="45" height="44" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="text-white self-center text-xl font-semibold whitespace-nowrap dark:text-white">TripUp</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <button onClick={() => setOpenModal(true)} className="text-gray-800 bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca]  font-medium rounded-lg text-sm px-4 lg:px-5 py-3.5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 ">Sign in</button>
                            <a href="#" className="text-white  hover:bg-white hover:text-black   font-medium rounded-lg text-sm px-4 lg:px-5 py-3.5 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 ">Get started</a>
                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-white ring-2 ring-white hover:text-black rounded-lg lg:hidden hover:bg-white  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-normal lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link href="/" className="block py-2 pr-4 pl-3 hover:text-[#98DB2E] text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link href="/Discover" className="block py-2 pr-4 pl-3 hover:text-[#98DB2E] text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Discover</Link>
                                </li>
                                <li>
                                    <Link href="/Explore" className="block py-2 pr-4 pl-3 hover:text-[#98DB2E] text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Explore</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <Modal show={openModal} className='bg-black' size="sm" position="center" onClose={() => setOpenModal(false)} popup >
                <Modal.Header ></Modal.Header>
                <Modal.Body>
                    <h1 className='text-center mb-10 text-2xl font-medium text-black'>Sign In</h1>
                    <div className=" flex flex-col items-center">
                        <button onClick={signInWithGoogle} type="button" className=" w-60 flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-3  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>

                            Sign in with Google
                        </button>
                        <button type="button" className=" w-60 flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 mb-5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                            </svg>
                            Sign in with Facebook
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}