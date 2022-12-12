import BackButton from "@/Components/Admin/BackButton";
import ButtonLink from "@/Components/Admin/ButtonLink";
import GenericPreview from "@/Components/Admin/GenericPreview";
import useCheckQuery from "@/Hooks/Admin/useCheckQuery";
import { COLORS } from "@/Utils/colors";
import query from "@/Utils/query";
import { Box, Divider, ListItem, UnorderedList } from "@chakra-ui/react";
import HTMLReactParser from "html-react-parser";
import { FiArrowLeft } from "react-icons/fi";

export default function Detail({ data }) {
    const { element } = useCheckQuery();

    if (element) return element;

    return (
        <GenericPreview name="Lesson">
            <UnorderedList mt={3}>
                <ListItem>Title: {data.title}</ListItem>
                <ListItem>Type: {data.type}</ListItem>
                <ListItem>Length: {data["length"]}</ListItem>
            </UnorderedList>
            <Divider borderColor={COLORS.admin.black} />
            {data.type === "text" ? (
                <Box
                    mt={3}
                    w="full"
                    minH="full"
                    border="1px solid"
                    borderColor={COLORS.admin.black}
                >
                    {HTMLReactParser(data.content)}
                </Box>
            ) : (
                <iframe
                    style={{ marginTop: 10 }}
                    width="560"
                    height="315"
                    src={data.link}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            )}
            <ButtonLink
                url="admin.courses.show"
                params={{ courses: query("from") }}
            >
                <FiArrowLeft /> Back
            </ButtonLink>
        </GenericPreview>
    );
}
