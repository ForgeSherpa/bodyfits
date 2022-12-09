import { COLORS } from "@/Utils/colors";
import { Button as ChakraButton } from "@chakra-ui/react";

export default function Button(props) {
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
