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
    Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";

export default function DeleteAccount({ Auth }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Stack direction="column">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    py={12}
                    bgPosition="center"
                    bgRepeat="no-repeat"
                >
                    <Wrap spacing={4}>
                        <WrapItem>
                            <Button colorScheme="red" onClick={onOpen}>
                                Delete Account
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent bg={COLORS.ijoSoft}>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <WhiteText
                                            textAlign="center"
                                            fontSize={36}
                                            fontWeight={700}
                                        >
                                            CONFIRM TO DELETE
                                        </WhiteText>
                                        <WhiteText
                                            textAlign="center"
                                            fontSize={16}
                                            fontWeight={400}
                                        >
                                            Are You Sure? You won't able to
                                            restored it once it had been deleted
                                        </WhiteText>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Grid
                                            Grid
                                            templateColumns="repeat(2, 1fr)"
                                            gap={2}
                                        >
                                            <Button
                                                w="100%"
                                                colorScheme="red"
                                                alignItems="center"
                                                mr={150}
                                                onClick={onClose}
                                            >
                                                Yes
                                            </Button>

                                            <Button
                                                w="100%"
                                                bg={COLORS.putihTransparan}
                                                alignItems="center"
                                                onClick={onClose}
                                                textColor={COLORS.putih}
                                            >
                                                No
                                            </Button>
                                        </Grid>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </WrapItem>
                    </Wrap>
                </Box>
            </Stack>
        </>
    );
}
