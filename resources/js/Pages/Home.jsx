import Image from "@/Components/Image";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import MainLayout from "@/Layouts/MainLayout";
import { COLORS } from "@/Utils/colors";
import { Box, Flex } from "@chakra-ui/react";

export default function Home({ auth }) {
    useCustomBg();
    return (
        <MainLayout auth={auth}>
            <Flex>
                <Box
                    borderRadius="0px 40px 40px 0px"
                    backgroundColor={COLORS.ijoGelapKali}
                    py={77}
                    px={63}
                    justifyContent="space-between"
                    mt={70}
                    mb={66}
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
                </Box>
                <Image w="full" src="bodyfits.png" />
            </Flex>
        </MainLayout>
    );
}
