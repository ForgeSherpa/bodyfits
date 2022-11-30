import List from "@/Components/Courses/List";
import SearchBar from "@/Components/Searchbar";
import WhiteDivider from "@/Components/WhiteDivider";
import WhiteText from "@/Components/WhiteText";
import MainLayout from "@/Layouts/MainLayout";
import { Box } from "@chakra-ui/react";

export default function Courses({ auth, courses }) {
    console.log(courses);

    return (
        <MainLayout auth={auth}>
            <WhiteDivider />
            <Box textAlign="center" mx="auto" my="16">
                <WhiteText fontSize={48} fontWeight={700}>
                    WHAT DO YOU WANT TO TRAIN
                </WhiteText>
                <SearchBar />
            </Box>
            <List />
        </MainLayout>
    );
}
