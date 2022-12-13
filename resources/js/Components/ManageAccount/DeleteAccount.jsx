import {
    Grid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import WhiteText from "@/Components/WhiteText";
import { COLORS } from "@/Utils/colors";
import { Inertia } from "@inertiajs/inertia";

export default function DeleteAccount() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteAccountHandler = () => {
        Inertia.delete(route("profile.deleteAccount"));
        onClose();
    };

    return (
        <>
            <Button display="block" mt={3} colorScheme="red" onClick={onOpen}>
                Delete Account
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={COLORS.ijoBuatModal}>
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
                            Are You Sure? You won't able to restored it once it
                            had been deleted
                        </WhiteText>
                    </ModalBody>

                    <ModalFooter>
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            <Button
                                w="100%"
                                colorScheme="red"
                                alignItems="center"
                                mr={150}
                                onClick={deleteAccountHandler}
                            >
                                Yes
                            </Button>

                            <Button
                                w="100%"
                                bg={COLORS.putihTransparan}
                                alignItems="center"
                                onClick={onClose}
                                textColor={COLORS.putih}
                                _hover={{ opacity: 0.8 }}
                            >
                                No
                            </Button>
                        </Grid>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
