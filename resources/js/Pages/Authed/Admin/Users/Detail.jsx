import GenericDetail from "@/Components/Admin/GenericDetail";
import Image from "@/Components/Image";
import {
    Badge,
    Box,
    Flex,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

export default function Detail({ data }) {
    return (
        <GenericDetail mainUrl="admin.users.index" name="Users">
            <Flex
                justifyContent={{ base: "initial", lg: "space-around" }}
                alignItems={{ base: "initial", lg: "center" }}
                flexDirection={{ base: "column", lg: "row" }}
            >
                <Box>
                    <Text ml={{ base: 0, lg: 3 }} mb={{ base: 0, lg: 5 }}>
                        Photo:
                    </Text>
                    <Image
                        mb={3}
                        src={data.photo}
                        rounded={{ base: 20, lg: "full" }}
                        maxW={{ base: "full", lg: 200 }}
                    />
                </Box>
                <UnorderedList mt={3}>
                    <ListItem>Name: {data.name}</ListItem>
                    <ListItem>
                        Role:{" "}
                        <Badge
                            colorScheme={
                                data.role === "admin" ? "blue" : "gray"
                            }
                        >
                            {data.role}
                        </Badge>
                    </ListItem>
                    <ListItem>Email: {data.email}</ListItem>
                </UnorderedList>
            </Flex>
        </GenericDetail>
    );
}
