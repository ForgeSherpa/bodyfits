import Image from "@/Components/Image";
import UnderlineLink from "@/Components/UnderlineLink";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Divider, Flex, Grid as ChakraGrid } from "@chakra-ui/react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "@/Components/Card";
import Calendar from "react-calendar";

import "swiper/css";
import "swiper/css/pagination";
import "../../css/pagination.css";
import { COLORS } from "@/Utils/colors";
import Course from "@/Components/Home/Course";
import Trainer from "@/Components/Home/Trainer";
import usePagination from "@/Hooks/usePagination";

export default function Home({ auth, trainers }) {
    const { lists: trainersList, element } = usePagination(trainers);

    useCustomBg();
    return (
        <MainLayout auth={auth}>
            <Flex>
                <Card
                    py={77}
                    px={63}
                    justifyContent="space-between"
                    mt={70}
                    mb={66}
                    borderLeftRadius={0}
                >
                    <WhiteText fontSize={60} fontWeight={700}>
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
                    <WhiteText fontWeight="bold" fontSize={25} mt={34} ml={10}>
                        Start Now
                    </WhiteText>
                </Card>
                <Image w="full" src="bodyfits.png" />
            </Flex>
            <Box>
                <Flex
                    justifyContent="space-between"
                    mx={15}
                    mb={10}
                    alignItems="end"
                >
                    <WhiteText
                        fontSize={60}
                        fontWeight={700}
                        maxW="30%"
                        lineHeight={1}
                    >
                        Choose Your Own Courses
                    </WhiteText>
                    <UnderlineLink to="home">Show All</UnderlineLink>
                </Flex>
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                    }}
                    slidesPerView={3}
                    spaceBetween={300}
                    centeredSlides={true}
                    style={{
                        marginBottom: 135,
                        paddingLeft: 5,
                    }}
                    initialSlide={1}
                >
                    {[1, 2, 3, 4].map((item) => (
                        <SwiperSlide key={item}>
                            <Course />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box pr={39}>
                <WhiteText
                    fontSize={60}
                    fontWeight={700}
                    mb={15}
                    lineHeight={1}
                    ml={63}
                >
                    YOUR <br /> PROGRESS
                </WhiteText>
                <Box
                    ml={15}
                    rounded={40}
                    mb={10}
                    backgroundColor={COLORS.itemSoft}
                    overflow="hidden"
                >
                    <Flex>
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
                            <Calendar value={new Date()} />
                        </Box>
                        <Box
                            backgroundColor={COLORS.ijoSoft}
                            h="full"
                            w="40%"
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
                                    You are on <b>10</b> days streak
                                </WhiteText>
                                <Divider />
                                <WhiteText
                                    fontSize={48}
                                    fontWeight={700}
                                    textAlign="center"
                                    mt={10}
                                >
                                    You haven't missed a day!
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
                <WhiteText fontWeight="bold" fontSize={60}>
                    OUR TRAINERS
                </WhiteText>
                <ChakraGrid
                    templateColumns="repeat(3, 1fr)"
                    gap={10}
                    justifyContent="center"
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
