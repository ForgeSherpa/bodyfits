import { COLORS } from "@/Utils/colors";
import {
    InputGroup,
    InputLeftElement,
    Input,
    Popover,
    useDisclosure,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    PopoverBody,
    Button,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "./Link";
import WhiteText from "./WhiteText";

export default function SearchBar({ path, placeholder }) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [lists, setLists] = useState([]);

    const search = async (e) => {
        if ("code" in e && e.code !== "Enter") {
            return;
        }

        const res = await fetch(route(path, { search: e.target.value }), {
            headers: {
                Accept: "application/json",
            },
        });

        const json = await res.json();
        onToggle();
        setLists(json);
    };

    return (
        <Popover
            matchWidth
            isLazy
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            returnFocusOnClose={false}
        >
            <PopoverTrigger>
                <InputGroup mx="auto" maxW={870} rounded={10}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch color={COLORS.putih} />}
                    />
                    <Input
                        color={COLORS.putih}
                        type="search"
                        placeholder={placeholder}
                        onKeyDown={search}
                    />
                </InputGroup>
            </PopoverTrigger>
            <PopoverContent bg="gray.800" w="full" maxH={500} overflowY="auto">
                <PopoverHeader>
                    <WhiteText>Search Result</WhiteText>
                </PopoverHeader>
                <PopoverBody>
                    <Flex flexDirection="column" gap={2}>
                        {lists.length <= 0 && (
                            <WhiteText>Search not found.</WhiteText>
                        )}
                        {lists.map((item) => (
                            <Link
                                bg="gray.600"
                                color={COLORS.putih}
                                to="courses.detail"
                                params={item.id}
                                key={item.id}
                                rounded="lg"
                                py={2}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
