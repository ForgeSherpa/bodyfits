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
            h={270}
            minW="full"
            flexDirection="row"
            px={59}
            py={51}
            gap={113}
            justifyContent="space-between"
            alignItems="center"
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
            <Box borderLeft="1px solid white" px={41}>
                <WhiteText letterSpacing={5} fontSize={36} textAlign="center">
                    Menu
                </WhiteText>
                <UnorderedList listStyleType="none" textAlign="left" ml={0}>
                    <List>
                        <WhiteLink to="home">Home</WhiteLink>
                    </List>
                    <List>
                        <WhiteLink to="home">Courses</WhiteLink>
                    </List>
                    <List>
                        <WhiteLink to="home">FAQ</WhiteLink>
                    </List>
                    <List>
                        <WhiteLink to="home">Sign Up</WhiteLink>
                    </List>
                </UnorderedList>
            </Box>
            <Box borderLeft="1px solid white" px={41}>
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
