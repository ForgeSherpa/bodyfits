import Button from "@/Components/Admin/Button";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useNextLeftPagination from "@/Hooks/useNextLeftPagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { COLORS } from "@/Utils/colors";
import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { FiCheck, FiEye, FiTrash2 } from "react-icons/fi";

export default function Feedback({ data }) {
    const { element, lists } = useNextLeftPagination(data);

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
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Feedback
            </Text>
            <ShadowBox>
                <Table>
                    <Thead>
                        <Tr>
                            <Th textAlign="center">No.</Th>
                            <Th textAlign="center">Title</Th>
                            <Th textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {lists.map((item, i) => (
                            <Tr
                                key={item.id}
                                bg={
                                    item.status === "READ"
                                        ? COLORS.admin.selected
                                        : undefined
                                }
                            >
                                <Td textAlign="center">{++i}</Td>
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
                        ))}
                    </Tbody>
                </Table>
                {element}
            </ShadowBox>
        </AdminLayout>
    );
}
