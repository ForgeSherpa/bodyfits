import { COLORS } from "@/Utils/colors";
import { Flex } from "@chakra-ui/react";
import Logo from "../Logo";
import Profile from "../Profile";
import WhiteDivider from "../WhiteDivider";
import WhiteLink from "./WhiteLink";

export default function TopBar({ auth }) {
    return (
        <Flex px={65} py={25} flexDirection="row" alignItems="center" gap={10}>
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
                    >
                        Back
                    </WhiteLink>
                </>
            </Flex>
        </Flex>
    );
}
