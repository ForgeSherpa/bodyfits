import { COLORS } from "@/Utils/colors";
import { Flex } from "@chakra-ui/react";
import Logo from "../Logo";
import WhiteDivider from "../WhiteDivider";
import WhiteLink from "../Topbar/WhiteLink";

export default function TopBar() {
    return (
        <Flex
            px={{ base: 3, lg: 65 }}
            py={{ base: 3, lg: 25 }}
            flexDirection="row"
            alignItems="center"
            gap={10}
        >
            <Logo />

            <WhiteDivider borderBottomWidth={3} width="full" />
            <Flex
                minW="fit-content"
                gap={7}
                flexDirection="row"
                alignItems="center"
            >
                <>
                    <WhiteLink
                        border="1px solid white"
                        py={2}
                        px={5}
                        rounded={36}
                        to="home"
                        className="transition-all delay-100"
                        _hover={{
                            bg: COLORS.putih,
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        Back
                    </WhiteLink>
                </>
            </Flex>
        </Flex>
    );
}
