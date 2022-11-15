import { COLORS } from "@/Utils/colors";
import { Divider, Flex } from "@chakra-ui/react";
import Logo from "../Logo";
import WhiteLink from "./WhiteLink";

export default function TopBar() {
    return (
        <Flex px={65} py={25} flexDirection="row" alignItems="center" gap={10}>
            <Logo />
            <Flex flexDirection="row" gap={14} ml={10}>
                <WhiteLink to="home">Courses</WhiteLink>
                <WhiteLink to="home">Settings</WhiteLink>
                <WhiteLink to="home">FAQ</WhiteLink>
            </Flex>
            <Divider
                borderColor={COLORS.putih}
                borderBottomWidth={3}
                width="full"
            />
            <Flex
                minW="fit-content"
                gap={7}
                flexDirection="row"
                alignItems="center"
            >
                <WhiteLink to="home">Sign Up</WhiteLink>
                <WhiteLink
                    border="1px solid white"
                    py={2}
                    px={5}
                    rounded={36}
                    _hover={{
                        cursor: "pointer",
                        backgroundColor: COLORS.putih,
                        color: COLORS.itemTerang,
                    }}
                    to="login"
                >
                    Login
                </WhiteLink>
            </Flex>
        </Flex>
    );
}
