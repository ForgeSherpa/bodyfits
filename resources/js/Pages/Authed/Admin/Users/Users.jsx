import Button from "@/Components/Admin/Button";
import ButtonLink from "@/Components/Admin/ButtonLink";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useTable from "@/Hooks/useTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Badge, Td, Text, Th, Tr } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { FiEdit, FiEye, FiPlus, FiRefreshCcw, FiTrash2 } from "react-icons/fi";

export default function Users({ data }) {
    const { Table, getCount, lists } = useTable(data, "admin.users.index");
    let count = getCount();
    const openDetail = useOpenDetail("admin.users.show");
    const openEdit = useOpenDetail("admin.users.edit");

    const { fn: openDeleteModal, modal } = useDelete(
        "admin.users.destroy",
        "User"
    );

    const handleRestore = (id) => {
        Inertia.put(route("admin.users.restore"), { user_id: id });
    };

    return (
        <AdminLayout>
            <Head title="Manage Users" />
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Manage Users
            </Text>
            <ShadowBox>
                <ButtonLink mb={6} url="admin.users.create">
                    <FiPlus /> Create New User
                </ButtonLink>
                <Table
                    head={
                        <Tr>
                            <Th textAlign="center">No.</Th>
                            <Th textAlign="center">Name</Th>
                            <Th textAlign="center">Email</Th>
                            <Th textAlign="center">Role</Th>
                            <Th textAlign="center">Action</Th>
                        </Tr>
                    }
                    body={lists.map((item) => {
                        return (
                            <Tr key={item.id}>
                                <Td textAlign="center">{++count}</Td>
                                <Td textAlign="center">{item.name}</Td>
                                <Td textAlign="center">{item.email}</Td>
                                <Td textAlign="center">
                                    {item.deleted_at ? (
                                        <Badge colorScheme="red">Deleted</Badge>
                                    ) : (
                                        <Badge
                                            colorScheme={
                                                item.role === "admin"
                                                    ? "blue"
                                                    : "gray"
                                            }
                                        >
                                            {item.role}
                                        </Badge>
                                    )}
                                </Td>
                                <Td
                                    display="flex"
                                    justifyContent="center"
                                    gap={3}
                                >
                                    <Button
                                        onClick={() => openDetail(item.id)}
                                        shadow="none"
                                    >
                                        <FiEye />
                                    </Button>
                                    <Button
                                        shadow="none"
                                        onClick={() => openEdit(item.id)}
                                    >
                                        <FiEdit />
                                    </Button>
                                    {!item.deleted_at ? (
                                        <Button
                                            shadow="none"
                                            onClick={() =>
                                                openDeleteModal(item.id)
                                            }
                                        >
                                            <FiTrash2 />
                                        </Button>
                                    ) : (
                                        <Button
                                            shadow="none"
                                            onClick={() =>
                                                handleRestore(item.id)
                                            }
                                        >
                                            <FiRefreshCcw />
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                        );
                    })}
                />
            </ShadowBox>
        </AdminLayout>
    );
}
