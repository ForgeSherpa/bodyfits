import { COLORS } from "@/Utils/colors";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
    return (
        <InputGroup mx="auto" maxW={870} rounded={10}>
            <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color={COLORS.putih} />}
            />
            <Input
                color={COLORS.putih}
                type="search"
                placeholder="Search on your playlist"
            />
        </InputGroup>
    );
}
