import TopBar from "@/Components/Topbar/Topbar";
import TransparentInput from "@/Components/TransparentInput";
import WhiteDivider from "@/Components/WhiteDivider";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import { Box, Textarea, Button } from "@chakra-ui/react";

export default function Feedback({ auth }) {
    useCustomBg();

    return (
        <>
            <TopBar auth={auth} />
            <Box mt={75} px={130}>
                <Box
                    mb={10}
                    maxW={1144}
                    display="block"
                    mx="auto"
                    rounded={10}
                    bg={COLORS.putihSgtTransparan}
                    py={5}
                >
                    <WhiteText
                        pt={7}
                        textAlign="center"
                        fontSize={60}
                        fontWeight={700}
                    >
                        Feedback
                    </WhiteText>
                    <WhiteDivider borderBottomWidth={3} />
                    <WhiteText
                        mt={50}
                        textAlign="center"
                        fontSize={16}
                        fontWeight={500}
                    >
                        What is your opinion about the website?
                    </WhiteText>
                    <TransparentInput
                        display="block"
                        mx="auto"
                        mt={3}
                        maxW={620}
                        placeholder="Write Here"
                    />
                    <WhiteText
                        mt={30}
                        textAlign="center"
                        fontSize={16}
                        fontWeight={500}
                    >
                        please leave your feedback here :
                    </WhiteText>
                    <Textarea
                        bg={COLORS.putihTransparan}
                        mt={3}
                        maxW={620}
                        display="block"
                        mx="auto"
                        rows={10}
                        placeholder="Write your feedback here"
                    />
                    <Button
                        bg={COLORS.putihTransparan}
                        py={2}
                        px={16}
                        color={COLORS.putih}
                        mx="auto"
                        display="block"
                        mt={5}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </>
    );
}
