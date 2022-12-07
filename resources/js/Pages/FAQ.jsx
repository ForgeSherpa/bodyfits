import TopBar from "@/Components/Topbar/Topbar";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import MainLayout from "@/Layouts/MainLayout";
import { COLORS } from "@/Utils/colors";
import { Box, color, Flex } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { pull } from "lodash";
export default function FAQ({ auth }) {
    useCustomBg();

    return (
        <>
            <TopBar auth={auth} />
            <WhiteText
                textDecoration="underline"
                fontSize={64}
                fontWeight={700}
                textAlign="center"
            >
                Frequently Ask Questions
            </WhiteText>

            <WhiteText
                textAlign="center"
                maxW={670}
                mx="auto"
                fontSize={24}
                fontWeight={40}
                mt={10}
            >
                Apapun yang ingin Anda ketahui terkait pelayanan yang diberikan
                baik itu penggunaan maupun layanan yang disediakan di website
                ada disini{" "}
            </WhiteText>

            <Accordion
                defaultIndex={[0]}
                allowMultiple
                bg={COLORS.ijoLebihSoft}
                minH="100%"
                mt={83}
            >
                <Grid
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridTemplateRows="repeat(2, 1fr)"
                    gap={6}
                >
                    <GridItem>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <WhiteText>
                                            Is there any free trial?
                                        </WhiteText>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <WhiteText>
                                    yes, we are offering free courses, and 2
                                    consultation a month.
                                </WhiteText>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>
                    <GridItem>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box textAlign="left">
                                        <WhiteText>
                                            Can I change my plan later?
                                        </WhiteText>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <WhiteText>yes, absolutely.</WhiteText>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>
                    <GridItem>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box textAlign="left">
                                        <WhiteText>
                                            What Can I get From the Course?
                                        </WhiteText>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <WhiteText>
                                    you will get a virtual coaching from our
                                    best trainer.
                                </WhiteText>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>
                    <GridItem>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box textAlign="left">
                                        <WhiteText>
                                            What is Tracking Fits?
                                        </WhiteText>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <WhiteText>
                                    it will track days you spend in the website.
                                </WhiteText>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>

                    <GridItem>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box textAlign="left">
                                        <WhiteText>
                                            How does BodyFits work?
                                        </WhiteText>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <WhiteText>
                                    we will provide you our service.
                                </WhiteText>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>
                    <GridItem>
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box textAlign="left">
                                        <WhiteText>
                                            How long the course will take?
                                        </WhiteText>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <WhiteText>
                                    mostly it will take 3 weeks to fully
                                    complete the course.
                                </WhiteText>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>
                </Grid>
                <Flex
                    bg={COLORS.ijoSoft}
                    w="full"
                    p={10}
                    flexDirection="column"
                >
                    <WhiteText
                        fontSize={16}
                        fontWeight={700}
                        textAlign="center"
                    >
                        still have questions?
                    </WhiteText>
                    <WhiteText fontSize={13} fontWeight={40} textAlign="center">
                        can’t find the answer you’re looking for? Please chat to
                        our friendly team
                    </WhiteText>
                </Flex>
            </Accordion>
        </>
    );
}
