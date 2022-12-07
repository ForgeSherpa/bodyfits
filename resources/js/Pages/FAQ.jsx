import QA from "@/Components/FAQ/QA";
import Image from "@/Components/Image";
import TopBar from "@/Components/Topbar/Topbar";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import { Box, Flex, Accordion, Grid } from "@chakra-ui/react";

const questionsCollection = [
    {
        question: "Is there any free trial?",
        answer: "Are you dump? Did you ever see pricing page? No right! Because we're free.",
    },
    {
        question: "Can't I change my plan later?",
        answer: "To what? what kind of plan we're talking about?",
    },
    {
        question: "What can I get from the course?",
        answer: "A video and a text.",
    },
    {
        question: "What is tracking fits?",
        answer: "It's our tracking system. It's just a decoration though.",
    },
    {
        question: "How does bodyfits work?",
        answer: "We built on top of Laravel, Inertia, and React. And We are not the developers of these technology. Better ask Taylor eh?",
    },
    {
        question: "How long the course will take?",
        answer: "We have these length features. Figure it on your own!",
    },
];

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
                Whatever you want to ask. It's here. It's just here. I don't
                know why. But it's exist for a reason. Because a lotta people
                keep asking these dumb question.
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
                    p={55}
                >
                    {questionsCollection.map((item, i) => (
                        <QA {...item} key={i} />
                    ))}
                </Grid>
                <Box p={7}>
                    <Flex
                        bg={COLORS.ijoSoft}
                        w="full"
                        p={6}
                        flexDirection="column"
                    >
                        <Box mx="auto" mb={2}>
                            <img src="someWhiteThingy.svg" width={130} />
                        </Box>
                        <WhiteText
                            fontSize={16}
                            fontWeight={700}
                            textAlign="center"
                        >
                            still have questions?
                        </WhiteText>
                        <WhiteText
                            fontSize={13}
                            fontWeight={40}
                            textAlign="center"
                        >
                            can't find the answer you're looking for? Please
                            chat to our friendly team
                        </WhiteText>
                    </Flex>
                </Box>
            </Accordion>
        </>
    );
}
