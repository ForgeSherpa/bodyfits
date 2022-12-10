import Button from "@/Components/Admin/Button";
import OutlineInput from "@/Components/Admin/OutlineInput";
import OutlineTextarea from "@/Components/Admin/OutlineTextarea";
import ShadowBox from "@/Components/Admin/ShadowBox";
import AdminLayout from "@/Layouts/AdminLayout";
import { Badge, Divider, Text } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { FiArrowLeft } from "react-icons/fi";

export default function Detail({ data }) {
    console.log(data);
    return (
        <AdminLayout>
            <ShadowBox>
                <Text fontSize="2xl" mb={1}>
                    Feedback Detail:{" "}
                </Text>

                <Divider mb={7} borderColor="black" />

                <Text mb={3}>
                    Status:{" "}
                    <Badge
                        colorScheme={
                            data.status === "READ" ? "green" : "yellow"
                        }
                    >
                        {data.status === "READ" ? "Readed" : "Unread"}
                    </Badge>
                </Text>

                <OutlineInput readOnly defaultValue={data.title} />
                <OutlineTextarea readOnly mt={3} defaultValue={data.content} />

                <Text mt={1}>Posted By: {data.user.name}</Text>

                <Button
                    onClick={() => Inertia.visit(route("admin.feedback.index"))}
                >
                    <FiArrowLeft /> Back
                </Button>
            </ShadowBox>
        </AdminLayout>
    );
}
