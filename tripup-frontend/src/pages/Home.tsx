//import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';

//import { GoogleLogin } from 'react-google-login';
//import { auth } from './firebase.js'; // Adjust the path as necessary

import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Home() {



  return (
    <>
      <Layout>

        <div className="py-52 px-10 md:px-20 sm:py-50 bg-center  bg-cover bg-[url('/src/assets/home-bg-phuket.jpeg')]" >
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

        {/* <img className="h-auto max-w-full" src="https://www.letsphuket.com/wp-content/uploads/phuket1.jpg" alt="image description" /> */}

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

      </Layout>
    </>
  );
}