import { Box, Text } from "@chakra-ui/react";
import OutlineSelect from "./OutlineSelect";

export default function FormSelect({ title, ...props }) {
    return (
        <Box>
            <Text mb={1}>{title}</Text>
            <OutlineSelect {...props} />
        </Box>
    );
}
