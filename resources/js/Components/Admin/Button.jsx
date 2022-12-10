import { COLORS } from "@/Utils/colors";
import { Button as ChakraButton } from "@chakra-ui/react";

export default function Button({ variant = "default", ...props }) {
    if (variant === "clear") {
        return (
            <ChakraButton
                my={3}
                bg="transparent"
                color={COLORS.admin.black}
                border="1px"
                borderColor={COLORS.admin.black}
                shadow={COLORS.admin.whiteBoxShadow}
                _hover={{ opacity: 0.8 }}
                _active={{ opacity: 0.5 }}
                rounded={2}
                {...props}
            />
        );
    }

    return (
        <ChakraButton
            my={3}
            bg={COLORS.admin.black}
            color={COLORS.putih}
            shadow={COLORS.admin.boxShadow}
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.5 }}
            {...props}
        />
    );
}
