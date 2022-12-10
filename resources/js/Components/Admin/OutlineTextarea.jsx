import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";

export default function OutlineTextarea({ error, ...props }) {
    return (
        <FormControl isInvalid={error}>
            <Textarea
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
                rows={10}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
}
