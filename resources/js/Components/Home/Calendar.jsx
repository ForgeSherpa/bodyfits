import { COLORS } from "@/Utils/colors";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import FormControlTextarea from "../FormControlTextArea";
import WhiteText from "../WhiteText";

const formatter = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
};

export default function Calandar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data, setData, processing, errors, post, reset, put } = useForm({
        note: "",
        date: "",
    });

    const [isModify, setIsModify] = useState(false);

    const onCalendarChange = async (data) => {
        try {
            const res = await fetch(
                route("findNotes", {
                    date: formatter(data),
                })
            );
            const json = await res.json();
            setIsModify(true);
            setData({
                note: json.note,
                date: json.date,
            });
        } catch {
            setIsModify(false);
            setData("date", formatter(data));
        }
        onOpen();
    };

    const onNoteChange = (e) => {
        setData("note", e.target.value);
    };

    const addNoteHandler = () => {
        post(route("notes"));
        if (!errors.note) {
            reset();
            onClose();
        }
    };

    const editNoteHandler = () => {
        put(route("notes"));
        if (!errors.note) {
            reset();
            onClose();
        }
    };

    const deleteNoteHandler = () => {
        Inertia.delete(route("notes"), {
            data: {
                date: data.date,
            },
        });
        reset();
        onClose();
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={COLORS.ijoBuatModal}>
                    <ModalHeader>
                        <WhiteText>Add Note</WhiteText>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControlTextarea
                            inputProps={{
                                value: data.note,
                                onChange: onNoteChange,
                                color: COLORS.putih,
                            }}
                            validation={errors.note}
                        />
                    </ModalBody>

                    <ModalFooter display="flex" gap={3}>
                        <Button
                            colorScheme="green"
                            alignItems="center"
                            onClick={
                                isModify ? editNoteHandler : addNoteHandler
                            }
                            isLoading={processing}
                        >
                            {isModify ? "Edit It" : "Add it"}
                        </Button>
                        {isModify && (
                            <Button
                                colorScheme="red"
                                alignItems="center"
                                onClick={deleteNoteHandler}
                            >
                                Delete Note
                            </Button>
                        )}
                        <Button
                            bg={COLORS.putihTransparan}
                            alignItems="center"
                            onClick={onClose}
                            textColor={COLORS.putih}
                            _hover={{ opacity: 0.8 }}
                            disabled={processing}
                        >
                            Ah no.
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ReactCalendar onChange={onCalendarChange} value={new Date()} />;
        </>
    );
}
