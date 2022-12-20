import { COLORS } from "@/Utils/colors";
import { Box, Flex, List, UnorderedList } from "@chakra-ui/react";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";
import Logo from "../Logo";
import WhiteLink from "../Topbar/WhiteLink";
import WhiteText from "../WhiteText";

export default function Footer() {
    return (
        <Flex
            backgroundColor={COLORS.ijoGelapKali}
            h={{ base: "fit-content", lg: 270 }}
            minW="full"
            flexDirection={{ base: "column", lg: "row" }}
            px={{ base: 3, lg: 59 }}
            py={{ base: 3, lg: 51 }}
            gap={{ base: 0, lg: 113 }}
            justifyContent={{ base: "normal", lg: "space-between" }}
            alignItems={{ base: "normal", lg: "center" }}
        >
            <Box>
                <Logo />
                <WhiteText
                    mt="-4"
                    letterSpacing={0.9}
                    opacity="0.84"
                    fontSize={20}
                >
                    Your best workout assistant
                </WhiteText>
            </Box>
            <Box
                mt={{ base: 10, lg: 0 }}
                borderLeft="1px solid white"
                px={{ base: 10, lg: 41 }}
            >
                <WhiteText
                    letterSpacing={5}
                    fontSize={{ base: 24, lg: 36 }}
                    textAlign="center"
                >
                    Menu
                </WhiteText>
                <UnorderedList listStyleType="none" textAlign="left" ml={0}>
                    <List>
                        <WhiteLink to="home">Home</WhiteLink>
                    </List>
                    <List>
                        <WhiteLink to="courses.index">Courses</WhiteLink>
                    </List>
                    <List>
                        <WhiteLink to="faq">FAQ</WhiteLink>
                    </List>
                    <List>
                        <WhiteLink to="register">Sign Up</WhiteLink>
                    </List>
                </UnorderedList>
            </Box>
            <Box
                mt={{ base: 10, lg: 0 }}
                borderLeft="1px solid white"
                px={{ base: 10, lg: 41 }}
            >
                <Flex flexDirection="row" gap={3} alignItems="center">
                    <FiInstagram color={COLORS.putih} fontSize={30} />
                    <WhiteText>@bodyfits.id</WhiteText>
                </Flex>
                <Flex mt={7} flexDirection="row" gap={3} alignItems="center">
                    <FiFacebook color={COLORS.putih} fontSize={30} />
                    <WhiteText>bodyfits.id</WhiteText>
                </Flex>
                <Flex mt={7} flexDirection="row" gap={3} alignItems="center">
                    <FiMail color={COLORS.putih} fontSize={30} />
                    <WhiteText>support@bodyfits.id</WhiteText>
                </Flex>
            </Box>
        </Flex>
    );
}
