import Button from "@/Components/Admin/Button";
import { makeToast } from "@/Utils/toast";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

export default function useDelete(url, title) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [selectedId, setSelectedId] = useState("");

    const openDeleteModal = (id) => {
        setSelectedId(id);
        onOpen();
    };

    const deleteData = () => {
        if (!selectedId) {
            makeToast(
                "Something went wrong",
                "error",
                "This issue appear to be related to FrontEnd Problem."
            );
        }

        Inertia.delete(route(url, selectedId), {
            preserveState: true,
        });
        onClose();
        setSelectedId("");
    };

    const modal = (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete {title}?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you certain sir or maybe miss or whatever?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button variant="clear" onClick={onClose}>
                        To be honest, No!
                    </Button>
                    <Button ml={3} onClick={deleteData}>
                        Yes, Goodbye!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

    return {
        modal,
        fn: openDeleteModal,
    };
}
