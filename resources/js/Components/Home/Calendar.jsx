import { COLORS } from "@/Utils/colors";
import { makeToast } from "@/Utils/toast";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
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
    const [marks, setMarks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotesList = async () => {
        const res = await fetch(route("notes"), {
            headers: {
                Accept: "application/json",
            },
        });
        const json = await res.json();
        setMarks(json.map((item) => item.date));
    };

    const { auth } = usePage().props;

    useEffect(() => {
        if (auth.user === null) return;
        setIsLoading(true);
        fetchNotesList();
        setIsLoading(false);
    }, [auth]);

    const onCalendarChange = async (data) => {
        if (auth.user === null) {
            makeToast("Login dlu mamank", "error");
            return;
        }
        onOpen();
        try {
            setIsLoading(true);
            const res = await fetch(
                route("findNotes", {
                    date: formatter(data),
                }),
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw Error("awokowkowk");
            }

            const json = await res.json();
            setIsModify(true);
            setData({
                note: json.note,
                date: json.date,
            });
        } catch (err) {
            setIsModify(false);
            setData({
                note: "",
                date: formatter(data),
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onNoteChange = (e) => {
        setData("note", e.target.value);
    };

    const addNoteHandler = () => {
        post(route("notes"), {
            preserveScroll: true,
        });
        makeToast("Notes added.", "success");
        setIsLoading(true);
        fetchNotesList();
        setIsLoading(false);
        if (!errors.note) {
            reset();
            onClose();
        }
    };

    const editNoteHandler = () => {
        put(route("notes"), {
            preserveScroll: true,
        });
        makeToast("Notes edited.", "success");
        setIsLoading(true);
        fetchNotesList();
        setIsLoading(false);
        if (!errors.note) {
            reset();
            onClose();
        }
    };

    const deleteNoteHandler = async () => {
        Inertia.delete(route("notes"), {
            data: {
                date: data.date,
            },
            preserveScroll: true,
        });
        reset();
        makeToast("Notes deleted.", "success");
        setIsLoading(true);
        fetchNotesList();
        setIsLoading(false);
        onClose();
    };

    const tileClassier = ({ date, view }) => {
        if (view === "month" && marks.includes(formatter(date))) {
            return "event-calendar";
        }
    };

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={COLORS.ijoBuatModal}>
                    {isLoading ? (
                        <Spinner m={14} mx="auto" />
                    ) : (
                        <>
                            <ModalHeader>
                                <WhiteText>Add Note</WhiteText>
                            </ModalHeader>
                            <ModalCloseButton color="white" />
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
                                        isModify
                                            ? editNoteHandler
                                            : addNoteHandler
                                    }
                                    isLoading={processing || isLoading}
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
                                    disabled={processing || isLoading}
                                >
                                    Ah no.
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ReactCalendar
                tileClassName={tileClassier}
                onChange={onCalendarChange}
                value={new Date()}
            />
        </>
    );
}
