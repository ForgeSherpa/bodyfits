import { Box, Text } from "@chakra-ui/react";
import OutlineTextarea from "./OutlineTextarea";

export default function FormTextarea({ title, ...props }) {
    return (
        <Box>
            <Text>{title}</Text>
            <OutlineTextarea {...props} />
        </Box>
    );
}
