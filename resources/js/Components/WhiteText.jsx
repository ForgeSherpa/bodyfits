import React from "react";
import { Text } from "@chakra-ui/react";
import { COLORS } from "@/Utils/colors";

export default function WhiteText({ children, ...rest }) {
    return (
        <Text {...rest} color={COLORS.putih}>
            {children}
        </Text>
    );
}
