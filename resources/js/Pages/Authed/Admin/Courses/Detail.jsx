import GenericDetail from "@/Components/Admin/GenericDetail";
import OutlineTextarea from "@/Components/Admin/OutlineTextarea";
import useTable from "@/Hooks/useTable";
import { COLORS } from "@/Utils/colors";
import { Divider, ListItem, UnorderedList } from "@chakra-ui/react";

export default function Detail({ data, lessons }) {
    const {} = useTable(lessons, "admin.courses.show");

    return (
        <GenericDetail mainUrl="admin.courses.index" name="Course">
            <UnorderedList mt={3}>
                <ListItem>Title: {data.title}</ListItem>
                <ListItem>Trained By: {data.trainer.name}</ListItem>
                <ListItem>Categorized under: {data.categories.name}</ListItem>
            </UnorderedList>
            <OutlineTextarea mt={5} readOnly defaultValue={data.description} />
            <Divider my={5} borderColor={COLORS.admin.black} />
        </GenericDetail>
    );
}
