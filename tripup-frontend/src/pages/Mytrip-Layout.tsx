import Navbar from "../components/Navbar";
import Footer from "../components/Mytrip-Footer";

export default function MytripLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <main>
                {/* Render the children components */}
                {children}
            </main>
            <Footer />
        </div>
    );
};