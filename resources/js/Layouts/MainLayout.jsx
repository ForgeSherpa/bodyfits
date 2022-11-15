import Footer from "@/Components/Footer/Footer";
import TopBar from "@/Components/Topbar/Topbar";
import useCustomBg from "@/Hooks/useCustomBg";

export default function MainLayout() {
    useCustomBg();
    return (
        <>
            <TopBar />
            <Footer />
        </>
    );
}
