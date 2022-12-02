import TopBar from "@/Components/Topbar/Topbar";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";

export default function FAQ({ auth }) {
    useCustomBg();

    return (
        <>
            <TopBar auth={auth} />
            <WhiteText>Konten Mu Disini pack. Good luck!</WhiteText>
        </>
    );
}
