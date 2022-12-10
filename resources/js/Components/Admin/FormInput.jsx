import { Box, Text } from "@chakra-ui/react";
import OutlineInput from "./OutlineInput";

export default function FormInput({ title, ...props }) {
    return (
        <Box>
            <Text>{title}</Text>
            <OutlineInput {...props} />
        </Box>
    );
}
