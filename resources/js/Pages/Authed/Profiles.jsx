import TopBar from "@/Components/Topbar/Topbar2";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import { Box, Flex, Textarea, Accordion } from "@chakra-ui/react";
import Image from "@/Components/Image";
import { useForm } from "@inertiajs/inertia-react";
import {
    Grid,
    GridItem,
    WrapItem,
    Wrap,
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import FormControlTextarea from "@/Components/FormControlTextArea";
import DeleteAccount from "@/Components/ManageAccount/DeleteAccount";
import ChangeName from "@/Components/ManageAccount/ChangeName";
import ChangePassword from "@/Components/ManageAccount/ChangePassword";
import ChangeEmail from "@/Components/ManageAccount/ChangeEmail";

export default function Profile({ auth }) {
    useCustomBg();

    const { data } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        photo: "",
        _method: "put",
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <TopBar auth={auth} />
            <Box mt={75} px={130}>
                <Box
                    mb={10}
                    w="full"
                    display="block"
                    mx="auto"
                    rounded={10}
                    bg={COLORS.putihSgtTransparan}
                    py={5}
                >
                    <WhiteText
                        mt={30}
                        textAlign="center"
                        fontSize={50}
                        fontWeight={700}
                    >
                        YOUR ACCOUNT
                    </WhiteText>

                    <Wrap ml={365}>
                        <WrapItem>
                            <Image
                                src={auth.user.photo}
                                className="w-26 rounded-full"
                            />
                        </WrapItem>
                    </Wrap>

                    <ChangeName auth={auth} />
                    <ChangeEmail auth={auth} />
                    <WhiteText
                        textDecoration="underline"
                        mt={7}
                        textAlign="center"
                        fontSize={24}
                        fontWeight={300}
                    >
                        change password
                    </WhiteText>

                    <DeleteAccount auth={auth} />
                </Box>
            </Box>
        </>
    );
}
