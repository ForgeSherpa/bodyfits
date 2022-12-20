import { COLORS } from "@/Utils/colors";
import {
    Button,
    Flex,
    InputGroup,
    InputRightAddon,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import WhiteText from "../WhiteText";
import TransparentInput from "../TransparentInput";
import { makeToast } from "@/Utils/toast";
import { Inertia } from "@inertiajs/inertia";

export default function ChangeName({ name }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleConfirmClick = () => {
        if (!isEdit) {
            return makeToast("Something went wrong", "error");
        }

        Inertia.post(route("profile.changeName"), {
            name: newName,
        });

        setIsEdit(false);
    };

    if (isEdit) {
        return (
            <Flex mt={5}>
                <Stack spacing={4}>
                    <InputGroup>
                        <TransparentInput
                            borderRightRadius="none"
                            placeholder="your name here"
                            onChange={(e) => setNewName(e.target.value)}
                            value={newName}
                        />
                        <InputRightAddon
                            bg={COLORS.transparentInput}
                            border="none"
                        >
                            <Button
                                bg="transparent"
                                transition="all"
                                transitionDelay={100}
                                color={COLORS.putih}
                                _hover={{
                                    bg: "transparent",
                                    textDecor: "underline",
                                }}
                                onClick={handleConfirmClick}
                                _active={{ bg: "transparent", opacity: 0.8 }}
                            >
                                Confirm
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </Stack>
            </Flex>
        );
    }

    return (
        <Flex mt={5}>
            <WhiteText fontSize={24} fontWeight={400}>
                {name}
            </WhiteText>
            <Button
                mt={-3}
                ml={-3}
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ opacity: 0.6 }}
                onClick={() => setIsEdit(true)}
            >
                <FaPen color={COLORS.putih} />
            </Button>
        </Flex>
    );
}
