import Footer from "@/Components/Footer/Footer";
import TopBar from "@/Components/Topbar/Topbar";
import useCustomBg from "@/Hooks/useCustomBg";

export default function MainLayout({ auth, children }) {
    useCustomBg();
    
    return (
        <>
            <TopBar auth={auth} />
            {children}
            <Footer />
        </>
    );
}
