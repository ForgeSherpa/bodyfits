import Button from "@/Components/Admin/Button";
import ButtonLink from "@/Components/Admin/ButtonLink";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useTable from "@/Hooks/useTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Td, Text, Th, Tr } from "@chakra-ui/react";
import { Head } from "@inertiajs/inertia-react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

export default function Categories({ data }) {
    const { Table, getCount, lists } = useTable(data, "admin.categories.index");
    let count = getCount();
    const openEdit = useOpenDetail("admin.categories.edit");

    const { fn: openDeleteModal, modal } = useDelete(
        "admin.categories.destroy",
        "Category"
    );

    return (
        <AdminLayout>
            <Head title="Categories List" />
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Manage categories
            </Text>
            <ShadowBox>
                <ButtonLink mb={6} url="admin.categories.create">
                    <FiPlus /> Create New Category
                </ButtonLink>
                <Table
                    head={
                        <Tr>
                            <Th textAlign="center">No.</Th>
                            <Th textAlign="center">Name</Th>
                            <Th textAlign="center">Action</Th>
                        </Tr>
                    }
                    body={lists.map((item) => {
                        return (
                            <Tr key={item.id}>
                                <Td textAlign="center">{++count}</Td>
                                <Td textAlign="center">{item.name}</Td>
                                <Td
                                    display="flex"
                                    justifyContent="center"
                                    gap={3}
                                >
                                    <Button
                                        shadow="none"
                                        onClick={() => openEdit(item.id)}
                                    >
                                        <FiEdit />
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
