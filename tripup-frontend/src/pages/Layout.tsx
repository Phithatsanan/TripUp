import Footer from "../components/Footer";
import NavBar from "../components/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar/>
            <main>
                {/* Render the children components */}
                {children}
            </main>
            <Footer/>
        </div>
    );
};