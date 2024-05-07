// Explore.tsx
 
import { useEffect, useState, useContext } from 'react';
import Layout from "./Layout";
import { collection, getDocs, updateDoc, doc, query, orderBy, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Context } from '../auth/authcontext';
import { Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
 
interface Trip {
  id: string;
  trip_name?: string;
  trip_destination?: string;
  trip_date?: string;
  trip_image?: string;
  participants?: string[]; // Change the type to string[]
}
 
export default function Explore() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { user } = useContext(Context) as unknown as { user: any };
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const [, setOpenLogin] = useState(false);
 
 
  useEffect(() => {
    const fetchTrips = async () => {
      const tripCollectionRef = collection(db, 'Trip');
      const dataQuery = query(tripCollectionRef, orderBy('trip_date'));
      const querySnapshot = await getDocs(dataQuery);
      const tripsData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        trip_date: formatDate(doc.data().trip_date)
      })) as Trip[];
      setTrips(tripsData);
    };
    fetchTrips();
  }, []);
 
  const handleJoinTrip = async (tripId: string) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
  
    try {
      const tripDocRef = doc(db, 'Trip', tripId);
      const tripSnapshot = await getDoc(tripDocRef);
      const tripData = tripSnapshot.data();
  
      if (tripData) { // Add null check for tripData
        if (!tripData.participants) {
          tripData.participants = [];
        }
  
        if (!tripData.participants.includes(user.email)) {
          tripData.participants.push(user.email);
        } else {
          alert('You are already a participant in this trip!');
          return;
        }
  
        await updateDoc(tripDocRef, { participants: tripData.participants });
        alert('Successfully joined the trip!');
        navigate('/mytrip'); // Navigate to My Trip page after joining
      } else {
        console.error('Trip data not found');
        alert('Failed to join the trip. Please try again.');
      }
    } catch (error) {
      console.error('Error joining trip:', error);
      alert('Failed to join the trip. Please try again.');
    }
  };
  
  
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
 
  const formatDate = (_dateString: string) => {
  };
 
  return (
    <>
      <Layout>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-10 px-10 mx-auto max-w-screen-xl sm:py-16 sm:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-8 text-2xl tracking-tight font-medium">Explore your favorite trip!</h1>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map(trip => (
                <div key={trip.id} className="bg-white border-2 border-gray-300 rounded-3xl hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden">
                  <div className="flex flex-col md:flex-row px-4 py-6">
                    <div className="md:w-48 md:h-48 flex-shrink-0">
                      <img className="w-full h-full object-cover rounded-lg" src={trip.trip_image || 'default_trip_image.jpg'} alt="Trip" />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{trip.trip_name || 'Unnamed Trip'}</h2>
                        <p className="text-gray-600">{trip.trip_destination || 'No destination'}</p>
                        <p className="text-gray-500 text-sm">{trip.trip_date}</p>
                      </div>
                      <div className="flex justify-center">
                        <button onClick={() => handleJoinTrip(trip.id)} className="inline-flex items-center px-5 py-3 text-base font-medium text-center text-gray-800 bg-[#98DB2E] rounded-lg hover:bg-[#99db2eca]">
                          Join Trip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
  
      <Modal show={loginModalOpen} onClose={() => setLoginModalOpen(false)} popup dismissible>
  <Modal.Header style={{ textAlign: 'center' }}>
    <h2 className="text-xl font-medium">Sign In Required</h2>
  </Modal.Header>
  <Modal.Body style={{ textAlign: 'center' }}>
    <p className="mb-4">You need to sign in to join trips.</p>
    <div className="flex justify-center items-center">
      <button onClick={SignInWithGoogle} type="button" className="w-60 flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  </Modal.Body>
</Modal>
    </>
  );
}