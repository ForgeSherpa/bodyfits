import Button from "@/Components/Admin/Button";
import ButtonLink from "@/Components/Admin/ButtonLink";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useNextLeftPagination from "@/Hooks/useNextLeftPagination";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Badge,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { FiEdit, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";

export default function Feedback({ data }) {
    const { element, lists, startCount } = useNextLeftPagination(data);
    let count = startCount;
    const openDetail = useOpenDetail("admin.users.show");
    const openEdit = useOpenDetail("admin.users.edit");

    const { fn: openDeleteModal, modal } = useDelete(
        "admin.users.destroy",
        "User"
    );

    return (
        <AdminLayout>
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Manage Users
            </Text>
            <ShadowBox>
                <ButtonLink mb={6} url="admin.users.create">
                    <FiPlus /> Create New User
                </ButtonLink>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th textAlign="center">No.</Th>
                                <Th textAlign="center">Name</Th>
                                <Th textAlign="center">Email</Th>
                                <Th textAlign="center">Role</Th>
                                <Th textAlign="center">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {lists.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td textAlign="center">{++count}</Td>
                                        <Td textAlign="center">{item.name}</Td>
                                        <Td textAlign="center">{item.email}</Td>
                                        <Td textAlign="center">
                                            <Badge
                                                colorScheme={
                                                    item.role === "admin"
                                                        ? "blue"
                                                        : "gray"
                                                }
                                            >
                                                {item.role}
                                            </Badge>
                                        </Td>
                                        <Td
                                            display="flex"
                                            justifyContent="center"
                                            gap={3}
                                        >
                                            <Button
                                                onClick={() =>
                                                    openDetail(item.id)
                                                }
                                                shadow="none"
                                            >
                                                <FiEye />
                                            </Button>
                                            <Button
                                                shadow="none"
                                                onClick={() =>
                                                    openEdit(item.id)
                                                }
                                            >
                                                <FiEdit />
                                            </Button>
                                            <Button
                                                shadow="none"
                                                onClick={() =>
                                                    openDeleteModal(item.id)
                                                }
                                            >
                                                <FiTrash2 />
                                            </Button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                {element}
            </ShadowBox>
        </AdminLayout>
    );
}
