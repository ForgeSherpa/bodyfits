import { COLORS } from "@/Utils/colors";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "../Logo";
import Profile from "../Profile";
import WhiteDivider from "../WhiteDivider";
import WhiteText from "../WhiteText";
import WhiteLink from "./WhiteLink";

export default function TopBar({ auth }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <>
            <Flex
                display={{ base: "flex", lg: "none" }}
                justifyContent="space-between"
                alignItems="center"
                p={3}
            >
                <Logo />
                <Button
                    ref={btnRef}
                    bg="transparent"
                    _hover={{ opacity: 0.8 }}
                    _active={{ opacity: 0.5 }}
                    onClick={onOpen}
                >
                    <FiMenu color={COLORS.putih} fontSize={40} />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent bg={COLORS.admin.black}>
                        <DrawerCloseButton color={COLORS.putih} />
                        <DrawerHeader>
                            <WhiteText>Menu</WhiteText>
                        </DrawerHeader>

                        <DrawerBody>
                            <Flex
                                flexDir="column"
                                justifyContent="space-between"
                                minH="full"
                            >
                                <Box>
                                    <Box
                                        p={3}
                                        bg={COLORS.itemSoft}
                                        mb={3}
                                        rounded={10}
                                    >
                                        <WhiteLink to="courses.index">
                                            Courses
                                        </WhiteLink>
                                    </Box>
                                    <Box
                                        p={3}
                                        bg={COLORS.itemSoft}
                                        mb={3}
                                        rounded={10}
                                    >
                                        <WhiteLink to="feedback">
                                            Feedback
                                        </WhiteLink>
                                    </Box>
                                    <Box
                                        p={3}
                                        bg={COLORS.itemSoft}
                                        mb={3}
                                        rounded={10}
                                    >
                                        <WhiteLink to="faq">FAQ</WhiteLink>
                                    </Box>
                                </Box>
                                {auth.user !== null ? (
                                    <Profile auth={auth} isMobile />
                                ) : (
                                    <Box>
                                        <WhiteLink mr={3} to="register">
                                            Sign Up
                                        </WhiteLink>
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
                                    </Box>
                                )}
                            </Flex>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button
                                variant="outline"
                                color={COLORS.putih}
                                mr={3}
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Flex
                px={65}
                py={25}
                flexDirection="row"
                alignItems="center"
                gap={10}
                display={{ base: "none", lg: "flex" }}
            >
                <Logo />
                <Flex flexDirection="row" gap={14} ml={10}>
                    <WhiteLink to="courses.index">Courses</WhiteLink>
                    <WhiteLink to="feedback">Feedback</WhiteLink>
                    <WhiteLink to="faq">FAQ</WhiteLink>
                </Flex>
                <WhiteDivider borderBottomWidth={3} width="full" />
                <Flex
                    minW="fit-content"
                    gap={7}
                    flexDirection="row"
                    alignItems="center"
                >
                    {auth.user !== null ? (
                        <Profile auth={auth} />
                    ) : (
                        <>
                            <WhiteLink to="register">Sign Up</WhiteLink>
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
        </>
    );
}
