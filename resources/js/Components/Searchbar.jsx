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
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "./Link";
import WhiteText from "./WhiteText";

export default function SearchBar({
    path,
    placeholder,
    q = {},
    customParam = null,
    to = "courses.detail",
}) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [lists, setLists] = useState([]);

    const search = async (e) => {
        if ("code" in e && e.code !== "Enter") {
            return;
        }

        const res = await fetch(route(path, { search: e.target.value, ...q }), {
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
            <PopoverContent
                bg={COLORS.itemTerang}
                w="full"
                maxH={500}
                overflowY="auto"
            >
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
                                bg={COLORS.itemSoft}
                                color={COLORS.putih}
                                to={to}
                                params={
                                    customParam
                                        ? customParam(item)
                                        : {
                                              courses: item.id,
                                              lessons: item.lessons[0].id,
                                          }
                                }
                                key={item.id}
                                rounded="lg"
                                py={2}
                                px={3}
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
