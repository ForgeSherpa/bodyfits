import List from "@/Components/Courses/List";
import SearchBar from "@/Components/Searchbar";
import WhiteDivider from "@/Components/WhiteDivider";
import WhiteText from "@/Components/WhiteText";
import usePagination from "@/Hooks/usePagination";
import MainLayout from "@/Layouts/MainLayout";
import { Box } from "@chakra-ui/react";

export default function Courses({ auth, courses }) {
    const { element, lists } = usePagination(courses);

    return (
        <MainLayout auth={auth}>
            <WhiteDivider />
            <Box textAlign="center" mx="auto" my="16">
                <WhiteText fontSize={48} fontWeight={700}>
                    WHAT DO YOU WANT TO TRAIN
                </WhiteText>
                <SearchBar path="courses.search" placeholder="Search courses" />
            </Box>
            <WhiteDivider />
            {lists.map((item) => (
                <List key={item.id} item={item} />
            ))}
            <Box my={100} />
            {element}
        </MainLayout>
    );
}
