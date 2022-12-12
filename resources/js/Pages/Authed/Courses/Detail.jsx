import Video from "@/Components/Courses/Video";
import Link from "@/Components/Link";
import Logo from "@/Components/Logo";
import Profile from "@/Components/Profile";
import SearchBar from "@/Components/Searchbar";
import WhiteLink from "@/Components/Topbar/WhiteLink";
import WhiteDivider from "@/Components/WhiteDivider";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import {
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Grid,
} from "@chakra-ui/react";
import HTMLReactParser from "html-react-parser";
import { FiChevronDown } from "react-icons/fi";

export default function Detail({
    auth,
    course,
    randomCourses,
    lesson,
    nextCourseId,
    nextLessonId,
    totalDuration,
}) {
    useCustomBg();

    return (
        <>
            <Flex gap={10} p={5} alignItems="center">
                <Logo />
                <Menu>
                    <Flex gap={3} alignItems="center">
                        <MenuButton
                            fontSize={25}
                            fontWeight={700}
                            color={COLORS.putih}
                        >
                            Browse
                        </MenuButton>
                        <FiChevronDown fontSize={20} color={COLORS.putih} />
                    </Flex>
                    <MenuList bg={COLORS.itemTerang} px={1}>
                        {randomCourses.map((item) => (
                            <MenuItem
                                bg={COLORS.itemTerang}
                                _hover={{ bg: COLORS.itemSoft }}
                                className="transition-all delay-100"
                                my={1}
                                rounded="xl"
                                key={item.id}
                            >
                                <WhiteLink
                                    to="courses.detail"
                                    params={{
                                        courses: item.id,
                                        lessons: item.lessons[0].id,
                                    }}
                                >
                                    {item.title}
                                </WhiteLink>
                            </MenuItem>
                        ))}
                        <MenuItem
                            bg={COLORS.itemTerang}
                            _hover={{ bg: COLORS.itemSoft }}
                            className="transition-all delay-100"
                            my={1}
                            rounded="xl"
                        >
                            <WhiteLink to="courses.index">Show More</WhiteLink>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <SearchBar
                    placeholder="Search Lessons"
                    path="courses.search"
                    q={{ type: "lesson", course_id: course.id }}
                    customParam={(item) => ({
                        courses: course.id,
                        lessons: item.id,
                    })}
                />
                <WhiteLink to="courses.index" fontSize={25} fontWeight={700}>
                    Courses
                </WhiteLink>
                <Profile auth={auth} />
            </Flex>
            <WhiteDivider />
            <Box p={50} mb={10}>
                <WhiteText fontSize={40} fontWeight={700}>
                    {course.title}
                </WhiteText>
                <Flex alignItems="center" gap={5}>
                    <WhiteText fontSize={20}>{course.trainer.name}</WhiteText>
                    <WhiteText fontWeight={700} fontSize={20}>
                        Follow
                    </WhiteText>
                </Flex>
                <Grid
                    h="70vh"
                    gridTemplateColumns="75% 1fr"
                    alignItems="center"
                    gap={10}
                >
                    <Box w="full" h="full">
                        {lesson.type === "text" ? (
                            <Box
                                mt={15}
                                border="1px solid"
                                borderColor={COLORS.putih}
                                rounded={10}
                                p={5}
                                overflowY="auto"
                                minH="full"
                                maxH="xl"
                                color={COLORS.putih}
                            >
                                {HTMLReactParser(lesson.content)}
                            </Box>
                        ) : (
                            <Video src={lesson.link} />
                        )}
                    </Box>
                    <Box h="full" maxH="md">
                        <Box
                            border="1px solid"
                            py={4}
                            px={3}
                            borderColor={COLORS.putih}
                            w="full"
                            rounded={10}
                            h="full"
                            overflowY="auto"
                        >
                            <WhiteText>
                                {course.lessons.length} Lesson
                                {course.lessons.length > 1 ? "s" : ""} (
                                {totalDuration})
                            </WhiteText>
                            {course.lessons.map((item, index) => (
                                <Link
                                    key={item.id}
                                    to="courses.detail"
                                    params={{
                                        courses: course.id,
                                        lessons: item.id,
                                    }}
                                    bg={
                                        item.id === lesson.id
                                            ? COLORS.itemSoft
                                            : undefined
                                    }
                                    px={5}
                                    py={2}
                                    color={COLORS.putih}
                                    display="flex"
                                    justifyContent="space-between"
                                    my={3}
                                    rounded={10}
                                >
                                    <WhiteText>
                                        {++index}. {item.title}
                                    </WhiteText>
                                    <WhiteText>{item.length}</WhiteText>
                                </Link>
                            ))}
                        </Box>
                        {nextCourseId && (
                            <Link
                                w="full"
                                p={3}
                                display="block"
                                textAlign="center"
                                mt={5}
                                bg={COLORS.ijoGelapKali}
                                color={COLORS.putih}
                                rounded={10}
                                _hover={{
                                    opacity: 0.8,
                                }}
                                _active={{
                                    opacity: 0.4,
                                }}
                                to="courses.detail"
                                params={{
                                    courses: nextCourseId,
                                    lessons: nextLessonId,
                                }}
                            >
                                Next Course
                            </Link>
                        )}
                    </Box>
                </Grid>
            </Box>
        </>
    );
}
