import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

export default function OutlineInput({ error, ...props }) {
    return (
        <FormControl isInvalid={error}>
            <Input
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
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
}
