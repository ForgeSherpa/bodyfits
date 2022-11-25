import WhiteText from "@/Components/WhiteText";
import MainLayout from "@/Layouts/MainLayout";

export default function Courses({ auth, courses }) {
    console.log(courses);

    return (
        <MainLayout auth={auth}>
            <WhiteText>KONTEN MU DISINI PAK</WhiteText>
        </MainLayout>
    );
}
