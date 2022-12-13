import TopBar from "@/Components/ManageAccount/Topbar";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import { Flex } from "@chakra-ui/react";
import DeleteAccount from "@/Components/ManageAccount/DeleteAccount";
import ChangeName from "@/Components/ManageAccount/ChangeName";
import ChangeEmail from "@/Components/ManageAccount/ChangeEmail";
import ChangePassword from "@/Components/ManageAccount/ChangePassword";
import ChangePhoto from "@/Components/ManageAccount/ChangePhoto";
import useToast from "@/Hooks/useToast";

export default function Profile({ auth }) {
    useCustomBg();
    useToast();

    return (
        <>
            <TopBar />
            <Flex
                mb={10}
                w="full"
                minH="100vh"
                mx="auto"
                rounded={10}
                bg={COLORS.putihSgtTransparan}
                py={5}
                flexDir="column"
                alignItems="center"
            >
                <WhiteText mt={30} fontSize={50} fontWeight={700}>
                    YOUR ACCOUNT
                </WhiteText>

                <ChangePhoto photo={auth.user.photo} />

                <ChangeName name={auth.user.name} />
                <ChangeEmail email={auth.user.email} />
                <ChangePassword />
                <DeleteAccount />
            </Flex>
        </>
    );
}
