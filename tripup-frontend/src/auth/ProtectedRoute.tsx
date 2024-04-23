
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../auth/authcontext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useContext(Context) as unknown as { user: any };

    if (!user) {
        return <Navigate to="/" replace />;
    } else {
        return children;
    }
}

// import { PropsWithChildren, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { useAuth } from './AuthProvider';

// type ProtectedRouteProps = PropsWithChildren;

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const user = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user === null) {
//       navigate('/signin', { replace: true });
//     }
//   }, [navigate, user]);

//   return children;
// }