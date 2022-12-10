import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import Button from "../Button";
import OutlineInput from "../OutlineInput";

const initial = {
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
};

export default function ChangePassword() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { data, setData, errors, put, processing } = useForm(initial);

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const changePasswordHandler = (e) => {
        e.preventDefault();
        put(route("profile.changePassword"));
        setData(initial);

        if (!errors) onClose();
    };

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form
                            id="changePassword"
                            onSubmit={changePasswordHandler}
                        >
                            <OutlineInput
                                placeholder="Your old password"
                                value={data.old_password}
                                name="old_password"
                                onChange={inputChangeHandler}
                                error={errors.old_password}
                                type="password"
                            />
                            <OutlineInput
                                placeholder="Your new password"
                                value={data.new_password}
                                type="password"
                                name="new_password"
                                onChange={inputChangeHandler}
                                error={errors.new_password}
                                mt={3}
                            />
                            <OutlineInput
                                placeholder="Your new password confirmation"
                                value={data.new_password_confirmation}
                                type="password"
                                name="new_password_confirmation"
                                onChange={inputChangeHandler}
                                mt={3}
                                error={errors.new_password_confirmation}
                            />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            disabled={processing}
                            onClick={onClose}
                            variant="clear"
                            mr={3}
                        >
                            No, Don't
                        </Button>
                        <Button
                            form="changePassword"
                            isLoading={processing}
                            type="submit"
                        >
                            Change It!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button onClick={onOpen} mr={3}>
                Change Password
            </Button>
        </>
    );
}
