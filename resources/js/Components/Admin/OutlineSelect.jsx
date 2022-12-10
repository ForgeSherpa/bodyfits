import { Select } from "@chakra-ui/react";

export default function OutlineSelect(props) {
    return (
        <Select
            {...props}
            rounded="none"
            borderColor="gray.800"
            _placeholder={{ color: "gray.600" }}
            _focus={{
                ring: "none",
                borderColor: "gray.900",
            }}
            _hover={{
                borderColor: "gray.700",
            }}
        />
    );
}
