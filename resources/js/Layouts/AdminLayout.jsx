import Link from "@/Components/Link";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import useToast from "@/Hooks/useToast";
import { COLORS } from "@/Utils/colors";
import {
    Box,
    Flex,
    Grid,
    GridItem,
    List,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link as InertiaLink } from "@inertiajs/inertia-react";
import {
    FiBookmark,
    FiExternalLink,
    FiHome,
    FiList,
    FiLogOut,
    FiMenu,
    FiMessageSquare,
    FiUsers,
} from "react-icons/fi";
import { GrUserWorker } from "react-icons/gr";

const menus = [
    {
        icon: FiExternalLink,
        name: "Home (User)",
        link: "home",
    },
    {
        icon: FiHome,
        name: "Dashboard",
        link: "admin.dashboard",
    },
    {
        icon: FiMessageSquare,
        name: "Feedback",
        link: "admin.feedback.index",
    },
    {
        icon: FiUsers,
        name: "Manage Users",
        link: "admin.users.index",
    },
    {
        icon: GrUserWorker,
        name: "Manage Trainers",
        link: "admin.trainers.index",
    },
    {
        icon: FiList,
        name: "Manage Category",
        link: "admin.categories.index",
    },
    {
        icon: FiBookmark,
        name: "Manage Courses",
        link: "admin.courses.index",
    },
];

export default function AdminLayout({ children }) {
    useToast();
    useCustomBg(COLORS.admin.background);

    return (
        <Grid
            gap={{ base: 0, lg: 10 }}
            gridTemplateColumns={{ base: "none", lg: "20rem 1fr" }}
        >
            <GridItem px={{ base: 0, lg: 7 }} py={{ base: 0, lg: 10 }}>
                <Box
                    minH="100vh"
                    display={{ base: "none", lg: "flex" }}
                    gap={4}
                    flexDirection="column"
                    p={3}
                >
                    <Text fontWeight="bold" fontSize="4xl">
                        BodyFits
                    </Text>
                    {menus.map((item, i) => (
                        <Flex
                            key={i}
                            bg={COLORS.admin.selected}
                            className="border border-zinc-500"
                            rounded="lg"
                            alignItems="center"
                            py={2}
                            px={3}
                            gap={3}
                        >
                            <item.icon />
                            <Link w="full" h="full" to={item.link}>
                                {item.name}
                            </Link>
                        </Flex>
                    ))}
                    <InertiaLink
                        as="button"
                        method="post"
                        href={route("logout")}
                        width="full"
                        height="full"
                    >
                        <Flex
                            bg={COLORS.admin.selected}
                            className="border border-zinc-500"
                            rounded="lg"
                            alignItems="center"
                            py={2}
                            px={3}
                            gap={3}
                        >
                            <FiLogOut />
                            <Text>Logout</Text>
                        </Flex>
                    </InertiaLink>
                </Box>
                <Flex
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    gap={3}
                    bg="orange.200"
                    w="full"
                    p={3}
                >
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton
                                    p={3}
                                    rounded="full"
                                    bg={COLORS.admin.black}
                                >
                                    <FiMenu
                                        className={`transition-all delay-100 ${
                                            isOpen && "rotate-90"
                                        }`}
                                        color={COLORS.putih}
                                    />
                                </MenuButton>
                                <MenuList>
                                    {menus.map((item, i) => (
                                        <MenuItem
                                            display="flex"
                                            alignItems="center"
                                            gap={3}
                                            key={i}
                                        >
                                            <item.icon />
                                            <Link
                                                w="full"
                                                h="full"
                                                to={item.link}
                                            >
                                                {item.name}
                                            </Link>
                                        </MenuItem>
                                    ))}
                                    <MenuItem
                                        display="flex"
                                        alignItems="center"
                                        gap={3}
                                        as={List}
                                        onClick={() =>
                                            Inertia.post(route("logout"))
                                        }
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        <FiLogOut />
                                        <Text>Logout</Text>
                                    </MenuItem>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                    <WhiteText fontWeight={600}>
                        BodyFits - Admin Panel
                    </WhiteText>
                </Flex>
            </GridItem>
            <GridItem p={{ base: 5, lg: 10 }}>{children}</GridItem>
        </Grid>
    );
}
