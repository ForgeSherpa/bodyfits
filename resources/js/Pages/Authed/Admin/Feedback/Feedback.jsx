import Button from "@/Components/Admin/Button";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useTable from "@/Hooks/useTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { COLORS } from "@/Utils/colors";
import { Td, Text, Th, Tr } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { FiCheck, FiEye, FiTrash2 } from "react-icons/fi";

export default function Feedback({ data }) {
    const { Table, getCount, lists } = useTable(data, "admin.feedback.index");

    let count = getCount();

    const openDetail = useOpenDetail("admin.feedback.detail");
    const markAsRead = async (id) => {
        Inertia.put(route("admin.feedback.mark", id), {
            preserveState: true,
        });
    };

    const { fn: openDeleteModal, modal } = useDelete(
        "admin.feedback.delete",
        "Feedback"
    );

    return (
        <AdminLayout>
            <Head title="Manage Feedback" />
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Feedback
            </Text>
            <ShadowBox>
                <Table
                    head={
                        <Tr>
                            <Th textAlign="center">No.</Th>
                            <Th textAlign="center">Title</Th>
                            <Th textAlign="center">Action</Th>
                        </Tr>
                    }
                    body={lists.map((item) => {
                        return (
                            <Tr
                                key={item.id}
                                bg={
                                    item.status === "READ"
                                        ? COLORS.admin.selected
                                        : undefined
                                }
                            >
                                <Td textAlign="center">{++count}</Td>
                                <Td textAlign="center">{item.title}</Td>
                                <Td
                                    display="flex"
                                    justifyContent="center"
                                    gap={3}
                                >
                                    {item.status === "UNREAD" && (
                                        <Button
                                            shadow="none"
                                            onClick={() => markAsRead(item.id)}
                                        >
                                            <FiCheck />
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => openDetail(item.id)}
                                        shadow="none"
                                    >
                                        <FiEye />
                                    </Button>
                                    <Button
                                        shadow="none"
                                        onClick={() => openDeleteModal(item.id)}
                                    >
                                        <FiTrash2 />
                                    </Button>
                                </Td>
                            </Tr>
                        );
                    })}
                />
            </ShadowBox>
        </AdminLayout>
    );
}
