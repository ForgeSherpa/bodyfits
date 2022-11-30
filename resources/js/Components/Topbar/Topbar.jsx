import { COLORS } from "@/Utils/colors";
import {
    Box,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import Image from "../Image";
import Logo from "../Logo";
import WhiteDivider from "../WhiteDivider";
import WhiteText from "../WhiteText";
import WhiteLink from "./WhiteLink";

export default function TopBar({ auth }) {
    return (
        <Flex px={65} py={25} flexDirection="row" alignItems="center" gap={10}>
            <Logo />
            <Flex flexDirection="row" gap={14} ml={10}>
                <WhiteLink to="courses.index">Courses</WhiteLink>
                <WhiteLink to="home">Settings</WhiteLink>
                <WhiteLink to="home">FAQ</WhiteLink>
            </Flex>
            <WhiteDivider borderBottomWidth={3} width="full" />
            <Flex
                minW="fit-content"
                gap={7}
                flexDirection="row"
                alignItems="center"
            >
                {auth.user !== null ? (
                    <Menu>
                        <Box as={MenuButton}>
                            <Flex alignItems="center" gap={3}>
                                <Image
                                    src={auth.user.photo}
                                    className="w-14 rounded-full"
                                />
                                <FiChevronDown color={COLORS.putih} />
                            </Flex>
                        </Box>
                        <MenuList bg={COLORS.itemTerang}>
                            <MenuItem bg={COLORS.itemTerang}>
                                <Flex
                                    alignItems="center"
                                    flexDirection="column"
                                    mx="auto"
                                    py={2}
                                    gap={5}
                                >
                                    <WhiteText fontWeight={700} fontSize={20}>
                                        {auth.user.name}
                                    </WhiteText>
                                    <Image
                                        src={auth.user.photo}
                                        className="w-24 rounded-full"
                                    />
                                </Flex>
                            </MenuItem>
                            <MenuItem bg={COLORS.itemTerang}>
                                <Button
                                    bg={COLORS.itemSoft}
                                    color={COLORS.putih}
                                    _hover={{
                                        opacity: 0.9,
                                    }}
                                    w="full"
                                    _active={{
                                        opacity: 0.5,
                                    }}
                                >
                                    Manage Account
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <>
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
                    </>
                )}
            </Flex>
        </Flex>
    );
}
