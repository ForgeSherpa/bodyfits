import List from "@/Components/Courses/List";
import NoData from "@/Components/NoData";
import SearchBar from "@/Components/Searchbar";
import WhiteDivider from "@/Components/WhiteDivider";
import WhiteText from "@/Components/WhiteText";
import usePagination from "@/Hooks/usePagination";
import MainLayout from "@/Layouts/MainLayout";
import { Box } from "@chakra-ui/react";
import { Head } from "@inertiajs/inertia-react";

export default function Courses({ auth, courses }) {
    const { element, lists } = usePagination(courses, {
        perPage: 15,
        startPage: 1,
        initialNotSame: true,
        preserveState: false,
    });

    return (
        <MainLayout auth={auth}>
            <Head title="Course Lists" />
            <WhiteDivider />
            <Box textAlign="center" mx="auto" my="16">
                <WhiteText fontSize={48} fontWeight={700}>
                    WHAT DO YOU WANT TO TRAIN
                </WhiteText>
                <SearchBar path="courses.search" placeholder="Search courses" />
            </Box>
            <WhiteDivider />
            <NoData
                modifier={lists}
                fallbackTitle="This is embrassing, but we don't have any courses right now."
                mt={5}
                mb={10}
            >
                {lists.map((item) => (
                    <List key={item.id} item={item} />
                ))}
            </NoData>
            <Box my={100} />
            {element}
    </MainLayout>
    );
}
