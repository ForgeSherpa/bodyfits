import Footer from "@/Components/Footer/Footer";
import TopBar from "@/Components/Topbar/Topbar";

export default function MainLayout({ auth, children }) {
    return (
        <>
            <TopBar auth={auth} />
            {children}
            <Footer />
        </>
    );
}
