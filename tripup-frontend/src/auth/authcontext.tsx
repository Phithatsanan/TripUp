import React, { useState, useEffect, createContext  } from "react";
import { User, onAuthStateChanged } from 'firebase/auth'

import { auth } from "../firebase";


export const Context = createContext(null);

export default function AuthContext({ children }: { children: React.ReactNode }) {


    //const auth = getAuth();
    //const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        }
    }, [])

    if (loading) {
        return (
            <div className=" max-w-screen w-auto max-h-screen-sm h-auto p-10 sm:p-20 flex flex-col justify-center items-center ">
                <svg className="mb-5 sm:mb-10 h-32 sm:h-60" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <h1 className=" font-semibold text-3xl sm:text-5xl">TripUp is on the way...</h1>
            </div>

        )
    }

    const values = {
        user: user,
        setUser: setUser
     }

    return (
        <Context.Provider value={values as any}>
            {!loading && children}
        </Context.Provider>
    )
}

