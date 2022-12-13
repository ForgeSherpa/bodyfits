import { COLORS } from "@/Utils/colors";
import {
    Box,
    Flex,
    List,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { Link as InertiaLink } from "@inertiajs/inertia-react";
import { FiChevronDown } from "react-icons/fi";
import Image from "./Image";
import Link from "./Link";
import WhiteText from "./WhiteText";

export default function Profile({ auth }) {
    return (
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
                <MenuItem
                    as={List}
                    bg={COLORS.itemTerang}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    {auth.user.role === "admin" && (
                        <Link
                            bg={COLORS.itemSoft}
                            color={COLORS.putih}
                            _hover={{
                                opacity: 0.9,
                            }}
                            w="full"
                            _active={{
                                opacity: 0.5,
                            }}
                            to="admin.dashboard"
                            py={2}
                            px={3}
                            rounded={10}
                            textAlign="center"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    <Link
                        bg={COLORS.itemSoft}
                        color={COLORS.putih}
                        _hover={{
                            opacity: 0.9,
                        }}
                        w="full"
                        _active={{
                            opacity: 0.5,
                        }}
                        to="profile"
                        py={2}
                        px={3}
                        rounded={10}
                        textAlign="center"
                    >
                        Manage Account
                    </Link>
                    <InertiaLink
                        as="button"
                        style={{
                            background: COLORS.itemSoft,
                            color: COLORS.putih,
                            borderRadius: 10,
                        }}
                        className="hover:opacity-90 active:opacity-50 py-2 px-3 text-center w-full"
                        href={route("logout")}
                        method="post"
                    >
                        Logout
                    </InertiaLink>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
