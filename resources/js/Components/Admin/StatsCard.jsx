import { Box, Flex } from "@chakra-ui/react";
import OutlineCard from "./OutlineCard";

export default function StatsCard({ count, ...props }) {
    return (
        <OutlineCard {...props}>
            <Flex alignItems="center" gap={3}>
                <Box p={2} px={4} bg="yellow.400" rounded="full" color="white">
                    {count}
                </Box>
            </Flex>
        </OutlineCard>
    );
}
