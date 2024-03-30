//import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';

//import { GoogleLogin } from 'react-google-login';
//import { auth } from './firebase.js'; // Adjust the path as necessary
import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Home() {

  const [openModal, setOpenModal] = useState(false);

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
      <Layout>

        <div className="py-52 px-10 md:px-20 sm:py-50 bg-center bg-cover bg-[url('/src/assets/home-bg-phuket.jpeg')]" >
          <h1 className=" text-4xl  font-medium leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Best Destinations to Experience</h1>
          <h1 className="mb-6 text-4xl  font-medium leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Less Experience to Discover</h1>

          {/* <p className="mb-6 text-lg font-normal text-white lg:text-xl text-center dark:text-gray-400">Here at TripUp we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
          <Link to="/discover" className="inline-flex items-center px-5 py-3 text-base font-medium text-center text-gray-800 bg-[#98DB2E] rounded-lg hover:bg-[#99db2eca] " >
            Discover
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>

        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-8 py-24 mx-auto text-center lg:py-16 lg:px-6 sm:py-8">
            <figure className="max-w-screen-md mx-auto">
              <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
              </svg>
              <blockquote>
                <p className="text-sm sm:text-xl  font-medium text-gray-900 dark:text-white">" TripUp is set to revolutionize the travel planning process by introducing a streamlined, efficient, and integrated platform. Our goal is to create a game-changing web app that transforms the way people plan their trips."</p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                {/* <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture"> */}
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-sm sm:text-lg text-gray-900 dark:text-white">Suhani Mehta</div>
                  <div className="pl-3 text-xs sm:text-base  font-light text-gray-500 dark:text-gray-400">TripUp Project Manager</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className=" py-40 px-10 md:px-20 sm:py-50 bg-center  bg-cover bg-[url('/src/assets/plane.jpeg')]" >
          <h1 className=" text-4xl text-center font-medium leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white mb-6">Plan your next trip with us</h1>

          {/* <p className="mb-6 text-lg font-normal text-white lg:text-xl text-center dark:text-gray-400">Here at TripUp we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
          <div className='flex justify-center'>
            <button onClick={() => setOpenModal(true)} className="inline-flex items-center px-5 py-3 text-base font-medium text-center text-gray-800 bg-[#98DB2E] rounded-lg hover:bg-[#99db2eca] " >
              Start Planning
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>

        {/* <img className="h-auto max-w-full" src="https://www.letsphuket.com/wp-content/uploads/phuket1.jpg" alt="image description" /> */}



      </Layout>

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