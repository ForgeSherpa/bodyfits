import TopBar from "@/Components/Topbar/Topbar";
import UnderlineLink from "@/Components/UnderlineLink";
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

export default function ChangeEmail({ Auth }) {
    return (
        <>
            <Box display="block" mx={560} bg={COLORS.putihsgtTransparan}>
                <Accordion defaultIndex={[0]} allowMultiple minH="100%" mt={0}>
                    <Wrap>
                        <WrapItem>
                            <WhiteText
                                textAlign="center"
                                fontSize={64}
                                fontWeight={400}
                                onClick={onOpen}
                            >
                                {auth.user.name}
                            </WhiteText>

                            <Grid
                                gridTemplateColumns="repeat(2, 1fr)"
                                gap={2}
                                p={2}
                            >
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent bg={COLORS.ijoSoft}>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <FormControlTextarea
                                                formControlProps={{
                                                    mt: 20,
                                                    maxW: 720,
                                                }}
                                                textProps={{
                                                    mt: 30,
                                                    textAlign: "center",
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                }}
                                                inputProps={{
                                                    textAlign: "left",
                                                    bg: COLORS.putihTransparan,
                                                    rows: 1,
                                                    placeholder:
                                                        "your email here",
                                                    name: "content",
                                                    color: COLORS.putih,
                                                }}
                                            ></FormControlTextarea>
                                            <Button
                                                mx={0}
                                                textColor="White"
                                                mt={20}
                                                bg={COLORS.putihTransparan}
                                            >
                                                Confirm
                                            </Button>
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>
                            </Grid>
                        </WrapItem>
                    </Wrap>
                </Accordion>
            </Box>
        </>
    );
}
