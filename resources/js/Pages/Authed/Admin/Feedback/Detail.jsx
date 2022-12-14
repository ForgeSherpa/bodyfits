import GenericDetail from "@/Components/Admin/GenericDetail";
import OutlineInput from "@/Components/Admin/OutlineInput";
import OutlineTextarea from "@/Components/Admin/OutlineTextarea";
import { Badge, Text } from "@chakra-ui/react";
import { Head } from "@inertiajs/inertia-react";

export default function Detail({ data }) {
    return (
        <GenericDetail mainUrl="admin.feedback.index" name="Feedback">
            <Head title="Feedback Detail" />
            <Text mb={3}>
                Status:{" "}
                <Badge
                    colorScheme={data.status === "READ" ? "green" : "yellow"}
                >
                    {data.status === "READ" ? "Readed" : "Unread"}
                </Badge>
            </Text>

            <OutlineInput readOnly defaultValue={data.title} />
            <OutlineTextarea readOnly mt={3} defaultValue={data.content} />

            <Text mt={1}>Posted By: {data.user.name}</Text>
        </GenericDetail>
    );
}
