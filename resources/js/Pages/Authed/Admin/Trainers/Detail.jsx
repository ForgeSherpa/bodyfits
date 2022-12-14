import GenericDetail from "@/Components/Admin/GenericDetail";
import OutlineTextarea from "@/Components/Admin/OutlineTextarea";
import Image from "@/Components/Image";
import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Head } from "@inertiajs/inertia-react";

export default function Detail({ data }) {
    return (
        <GenericDetail mainUrl="admin.trainers.index" name="Trainer">
            <Head title="Trainer Detail" />
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
                    <ListItem>Age: {data.age}</ListItem>
                    <ListItem>Nationality: {data.nationality}</ListItem>
                    <ListItem>Job: {data.job}</ListItem>
                    <ListItem>Contact: {data.contact}</ListItem>
                </UnorderedList>
            </Flex>
            <OutlineTextarea readOnly defaultValue={data.description} />
        </GenericDetail>
    );
}
