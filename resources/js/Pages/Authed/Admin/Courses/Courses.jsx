import Button from "@/Components/Admin/Button";
import ButtonLink from "@/Components/Admin/ButtonLink";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useTable from "@/Hooks/useTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Td, Text, Th, Tr } from "@chakra-ui/react";
import { FiEdit, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";

export default function Courses({ data }) {
    const { Table, getCount, lists } = useTable(data, "admin.courses.index");
    let count = getCount();
    const openDetail = useOpenDetail("admin.courses.show");
    const openEdit = useOpenDetail("admin.courses.edit");

    const { fn: openDeleteModal, modal } = useDelete(
        "admin.courses.destroy",
        "Course (All Lessons Will Be Deleted)"
    );

    return (
        <AdminLayout>
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Manage Courses
            </Text>
            <ShadowBox>
                <ButtonLink mb={6} url="admin.courses.create">
                    <FiPlus /> Create New Course
                </ButtonLink>
                <Table
                    head={
                        <Tr>
                            <Th textAlign="center">No.</Th>
                            <Th textAlign="center">Title</Th>
                            <Th textAlign="center">Trained By</Th>
                            <Th textAlign="center">Category</Th>
                            <Th textAlign="center">Action</Th>
                        </Tr>
                    }
                    body={lists.map((item) => {
                        return (
                            <Tr key={item.id}>
                                <Td textAlign="center">{++count}</Td>
                                <Td textAlign="center">{item.title}</Td>
                                <Td textAlign="center">{item.trainer.name}</Td>
                                <Td textAlign="center">
                                    {item.categories.name}
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
