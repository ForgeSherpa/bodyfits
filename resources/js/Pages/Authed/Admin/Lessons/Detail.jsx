import ButtonLink from "@/Components/Admin/ButtonLink";
import GenericDetail from "@/Components/Admin/GenericDetail";
import OutlineTextarea from "@/Components/Admin/OutlineTextarea";
import useTable from "@/Hooks/useTable";
import { COLORS } from "@/Utils/colors";
import {
    Divider,
    ListItem,
    Td,
    Text,
    Th,
    Tr,
    UnorderedList,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function Detail({ data, lessons }) {
    const { Table, getCount, lists } = useTable(lessons, "admin.courses.show", {
        courses: data.id,
    });
    let count = getCount();

    return (
        <GenericDetail mainUrl="admin.courses.index" name="Course">
            <UnorderedList mt={3}>
                <ListItem>Title: {data.title}</ListItem>
                <ListItem>Trained By: {data.trainer.name}</ListItem>
                <ListItem>Categorized under: {data.categories.name}</ListItem>
            </UnorderedList>
            <OutlineTextarea mt={5} readOnly defaultValue={data.description} />
            <Divider my={5} borderColor={COLORS.admin.black} />
            <ButtonLink
                mb={5}
                url="admin.lessons.create"
                params={{ from: data.id }}
            >
                <FiPlus /> Create New Lesson
            </ButtonLink>
            <Table
                head={
                    <Tr>
                        <Th textAlign="center">No.</Th>
                        <Th textAlign="center">Title</Th>
                        <Th textAlign="center">Length</Th>
                        <Th textAlign="center">Type</Th>
                    </Tr>
                }
                body={
                    lists.length > 0 ? (
                        lists.map((item) => (
                            <Tr key={item.id}>
                                <Td textAlign="center">{++count}</Td>
                                <Td textAlign="center">{item.title}</Td>
                                <Td textAlign="center">{item.length}</Td>
                                <Td textAlign="center">{item.type}</Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={4}>
                                <Text
                                    fontWeight={700}
                                    fontSize="2xl"
                                    textAlign="center"
                                >
                                    I don't sense any lessons.
                                </Text>
                            </Td>
                        </Tr>
                    )
                }
            />
        </GenericDetail>
    );
}
