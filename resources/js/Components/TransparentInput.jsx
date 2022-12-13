import React from "react";
import { Input } from "@chakra-ui/react";
import { COLORS } from "@/Utils/colors";

export default function TransparentInput({ children, ...rest }) {
    return (
        <Input
            border="none"
            bg={COLORS.transparentInput}
            borderRadius={10}
            color="white"
            _focus={{
                border: "none",
            }}
            {...rest}
        />
    );
}
