import { Button } from "@chakra-ui/react";
import React from "react";

export default function PrimaryButton({ children, ...rest }) {
    return (
        <Button
            bg="auth.200"
            color="white"
            border="solid 1px white"
            _hover={{ shadow: "md" }}
            _active={{ opacity: 0.8 }}
            {...rest}
        >
            {children}
        </Button>
    );
}
