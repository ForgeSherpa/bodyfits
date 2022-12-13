import { COLORS } from "@/Utils/colors";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Button,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import FormControlInput from "../FormControlInput";
import WhiteText from "../WhiteText";

export default function ChangePassword() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { processing, data, setData, put, errors, reset } = useForm({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const passwordChangeHandler = (e) => {
        e.preventDefault();
        put(route("profile.changePassword"));
        reset();
    };

    return (
        <>
            <WhiteText
                onClick={onOpen}
                textDecor="underline"
                _hover={{ cursor: "pointer" }}
            >
                change password
            </WhiteText>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={COLORS.ijoBuatModal}>
                    <ModalHeader>
                        <WhiteText textAlign="center">
                            Change My Password
                        </WhiteText>
                    </ModalHeader>
                    <ModalCloseButton color={COLORS.putih} />
                    <ModalBody mt={3}>
                        <form onSubmit={passwordChangeHandler} id="changePass">
                            <FormControlInput
                                formControlProps={{ mb: 3 }}
                                inputProps={{
                                    name: "old_password",
                                    onChange: inputChangeHandler,
                                    value: data.old_password,
                                    placeholder: "Your old password",
                                    type: "password",
                                }}
                                validation={errors.old_password}
                            >
                                Old Password
                            </FormControlInput>
                            <FormControlInput
                                formControlProps={{ mb: 3 }}
                                inputProps={{
                                    name: "new_password",
                                    onChange: inputChangeHandler,
                                    value: data.new_password,
                                    type: "password",
                                    placeholder: "Your old password",
                                }}
                                validation={errors.new_password}
                            >
                                New Password
                            </FormControlInput>
                            <FormControlInput
                                formControlProps={{ mb: 3 }}
                                inputProps={{
                                    name: "new_password_confirmation",
                                    onChange: inputChangeHandler,
                                    value: data.new_password_confirmation,
                                    type: "password",
                                    placeholder: "Your old password",
                                }}
                                validation={errors.new_password_confirmation}
                            >
                                Confirm your new password
                            </FormControlInput>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bg={COLORS.buttonChange}
                            color={COLORS.putih}
                            w="full"
                            rounded={10}
                            border="1px solid white"
                            _hover={{
                                opacity: 0.8,
                            }}
                            _active={{ opacity: 0.5 }}
                            isLoading={processing}
                            form="changePass"
                            type="submit"
                        >
                            Change It
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
