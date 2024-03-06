//import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
//import { GoogleLogin } from 'react-google-login';
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from 'react-router-dom';



export default function Home() {

  //const clientId = "676858431802-2t7cs9alg11s03l29h50rl7dl6kl5lv7.apps.googleusercontent.com"

  const [openModal, setOpenModal] = useState(false);

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   setUser(response.profileObj); // Storing the user details
  //   setIsModalOpen(false); // Close modal after login
  // };

  return (
    <>
      <header>
        <nav className="bg-white bordeimport React, { useState } from 'react';r-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
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
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">TripUp</span>
            </a>
            <div className="flex items-center lg:order-2">
              <button onClick={() => setOpenModal(true)} className="text-gray-800 bg-[#98DB2E] dark:text-white hover:bg-[#99db2eca] focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sign in</button>
              <a href="#" className="text-gray-800  hover:bg-gray-200 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
              <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link to="/" className="block py-2 pr-4 pl-3 hover:text-[#98DB2E] text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link to="/destination" className="block py-2 pr-4 pl-3 hover:text-[#98DB2E] text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Destination</Link>
                </li>
                <li>
                  <Link to="/trip" className="block py-2 pr-4 pl-3 hover:text-[#98DB2E] text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Trip</Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>


      <Modal show={openModal} size="sm" position="center" onClose={() => setOpenModal(false)} popup >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <h1 className='text-center mb-10 text-2xl font-medium text-black'>Sign In</h1>
          <div className="flex justify-center">
            <button type="button" className=" w-60 justify-items-center  flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              
              Sign in with Google
            </button>
          </div>
          <div className='flex justify-center'>
            <button type="button" className=" w-60 flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
</svg>
              Sign in with Facebook
            </button>

            {/* <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            className=" rounded-md" 
          /> */}
          </div>



        </Modal.Body>
      </Modal>


      <div className="py-60 px-10  md:px-20 sm:py-60 bg-center  bg-cover bg-[url('https://www.letsphuket.com/wp-content/uploads/phuket1.jpg')]" >
        <h1 className="mb-6 text-4xl  font-medium leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Best Destinations to Experience</h1>
        {/* <p className="mb-6 text-lg font-normal text-white lg:text-xl text-center dark:text-gray-400">Here at TripUp we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
        <button onClick={() => setOpenModal(true)} className="inline-flex items-center px-5 py-3 text-base font-medium text-center text-gray-800 bg-[#98DB2E] rounded-lg hover:bg-[#99db2eca] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" >
          Discover
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>

      {/* <img className="h-auto max-w-full" src="https://www.letsphuket.com/wp-content/uploads/phuket1.jpg" alt="image description" /> */}



      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-8 py-8 mx-auto text-center lg:py-16 lg:px-6">
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

      <footer className=" bg-gray-50 rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
        <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          &copy; 2024 <a href="http://tripup.ddns.net:45134/" className="hover:underline" target="_blank">tripup.net</a>. All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-1">
          <a href="#" data-tooltip-target="tooltip-facebook" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
              <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
            </svg>
            <span className="sr-only">Facebook</span>
          </a>
          <div id="tooltip-facebook" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            Like us on Facebook
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <a href="#" data-tooltip-target="tooltip-twitter" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path fill="currentColor" d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z" />
            </svg>
            <span className="sr-only">Twitter</span>
          </a>
          <div id="tooltip-twitter" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            Follow us on Twitter
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <a href="#" data-tooltip-target="tooltip-github" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
            </svg>
            <span className="sr-only">Github</span>
          </a>
          <div id="tooltip-github" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            Star us on GitHub
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <a href="#" data-tooltip-target="tooltip-dribbble" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd" />
            </svg>
            <span className="sr-only">Dribbble</span>
          </a>
          <div id="tooltip-dribbble" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            Follow us on Dribbble
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </footer>
    </>
  );
}