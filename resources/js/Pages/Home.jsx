import Image from "@/Components/Image";
import UnderlineLink from "@/Components/UnderlineLink";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Divider, Flex, Grid as ChakraGrid } from "@chakra-ui/react";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "@/Components/Card";

import "swiper/css";
import "swiper/css/pagination";
import "../../css/pagination.css";
import "swiper/css/free-mode";
import { COLORS } from "@/Utils/colors";
import Course from "@/Components/Home/Course";
import Trainer from "@/Components/Home/Trainer";
import usePagination from "@/Hooks/usePagination";
import useToast from "@/Hooks/useToast";
import { Head } from "@inertiajs/inertia-react";
import Calendar from "@/Components/Home/Calendar";
import Link from "@/Components/Link";

export default function Home({
    auth,
    trainers,
    courses,
    daysMissed,
    daysStreak,
}) {
    const { lists: trainersList, element } = usePagination(trainers, {
        perPage: 15,
        startPage: 0,
        initialNotSame: true,
        preserveState: false,
    });

    useCustomBg();
    useToast();
    return (
        <MainLayout auth={auth}>
            <Head title="Home" />
            <Flex flexDir={{ base: "column", lg: "row" }}>
                <Card
                    py={77}
                    px={63}
                    justifyContent="space-between"
                    mt={70}
                    mb={66}
                    borderLeftRadius={0}
                    borderRightRadius={{ base: 0, lg: 40 }}
                >
                    <WhiteText fontSize={{ base: 40, lg: 60 }} fontWeight={700}>
                        YOUR BEST IDEAL BODY TRAINER
                    </WhiteText>
                    <WhiteText
                        opacity={0.8}
                        wordBreak="break-word"
                        maxW="60%"
                        fontSize={25}
                    >
                        Get your body goals, start your journey with our help!
                    </WhiteText>
                    <Link to={auth.user ? "courses.index" : "register"}>
                        <WhiteText
                            fontWeight="bold"
                            fontSize={25}
                            mt={34}
                            ml={10}
                        >
                            Start Now
                        </WhiteText>
                    </Link>
                </Card>
                <Image
                    w="full"
                    display={{ base: "none", lg: "block" }}
                    src="bodyfits.png"
                />
            </Flex>
            <Box>
                <Flex
                    justifyContent="space-between"
                    mx={15}
                    mb={10}
                    alignItems="end"
                >
                    <WhiteText
                        fontSize={{ base: 25, lg: 60 }}
                        fontWeight={700}
                        maxW={{ base: "50%", lg: "30%" }}
                        lineHeight={1}
                    >
                        Choose Your Own Courses
                    </WhiteText>
                    <UnderlineLink to="courses.index">Show All</UnderlineLink>
                </Flex>
                <Swiper
                    modules={[Pagination, FreeMode]}
                    pagination={{
                        clickable: true,
                    }}
                    slidesPerView="auto"
                    spaceBetween={10}
                    style={{
                        marginBottom: 135,
                        paddingLeft: 5,
                    }}
                    freeMode={true}
                >
                    {courses.map((item) => (
                        <SwiperSlide
                            style={{ width: "fit-content" }}
                            key={item.id}
                        >
                            <Course item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box pr={{ base: 0, lg: 39 }}>
                <WhiteText
                    fontSize={{ base: 40, lg: 60 }}
                    fontWeight={700}
                    mb={15}
                    lineHeight={1}
                    ml={{ base: 26, lg: 63 }}
                >
                    YOUR <br /> PROGRESS
                </WhiteText>
                <Box
                    ml={{ base: 0, lg: 15 }}
                    rounded={40}
                    mb={10}
                    backgroundColor={COLORS.itemSoft}
                    overflow="hidden"
                >
                    <Flex flexDir={{ base: "column", lg: "row" }}>
                        <Box p={25}>
                            <WhiteText fontWeight={600} fontSize={30}>
                                Activity Tracking
                            </WhiteText>
                            <WhiteText>
                                {new Date().toLocaleString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </WhiteText>
                            <Calendar />
                        </Box>
                        <Box
                            backgroundColor={COLORS.ijoSoft}
                            h="full"
                            w={{ base: "full", lg: "40%" }}
                            p={35}
                        >
                            <Box
                                backgroundColor={COLORS.ijoLebihSoft}
                                p={10}
                                rounded={40}
                            >
                                <WhiteText
                                    textTransform="uppercase"
                                    textAlign="center"
                                >
                                    {daysMissed !== 0 && daysMissed !== null ? (
                                        <>
                                            You missed{" "}
                                            <b style={{ color: "red" }}>
                                                {daysMissed}
                                            </b>{" "}
                                            days.
                                        </>
                                    ) : daysStreak === 0 ||
                                      daysStreak === null ? (
                                        "You can do this!"
                                    ) : (
                                        <>
                                            You are on <b>{daysStreak}</b> days
                                            streak
                                        </>
                                    )}
                                </WhiteText>
                                <Divider />
                                <WhiteText
                                    fontSize={48}
                                    fontWeight={700}
                                    textAlign="center"
                                    mt={10}
                                >
                                    {daysMissed !== 0 && daysMissed !== null
                                        ? "You missed some days..."
                                        : "You haven't missed a day!"}
                                </WhiteText>
                                <WhiteText
                                    mt={30}
                                    fontWeight={500}
                                    fontSize={36}
                                    textAlign="center"
                                >
                                    Keep it up!
                                </WhiteText>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Box mt={136} px={30} mb={10}>
                <WhiteText fontWeight="bold" fontSize={{ base: 40, lg: 60 }}>
                    OUR TRAINERS
                </WhiteText>
                <ChakraGrid
                    templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
                    gap={10}
                    justifyContent="center"
                    justifyItems="center"
                >
                    {trainersList.map((item) => (
                        <Trainer key={item.id} data={item} />
                    ))}
                </ChakraGrid>
            </Box>
            {element}
        </MainLayout>
    );
}
