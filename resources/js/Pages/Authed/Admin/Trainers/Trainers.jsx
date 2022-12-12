import Button from "@/Components/Admin/Button";
import ButtonLink from "@/Components/Admin/ButtonLink";
import ShadowBox from "@/Components/Admin/ShadowBox";
import useDelete from "@/Hooks/Admin/useDelete";
import useOpenDetail from "@/Hooks/Admin/useOpenDetail";
import useTable from "@/Hooks/useTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Td, Text, Th, Tr } from "@chakra-ui/react";
import { FiEdit, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";

export default function Trainers({ data }) {
    const { Table, getCount, lists } = useTable(data, "admin.trainers.index");
    let count = getCount();
    const openDetail = useOpenDetail("admin.trainers.show");
    const openEdit = useOpenDetail("admin.trainers.edit");

    const { fn: openDeleteModal, modal } = useDelete(
        "admin.trainers.destroy",
        "Trainer"
    );

    return (
        <AdminLayout>
            {modal}
            <Text fontSize="3xl" mb={3} fontStyle="italic">
                Manage Trainers
            </Text>
            <ShadowBox>
                <ButtonLink mb={6} url="admin.trainers.create">
                    <FiPlus /> Create New Trainer
                </ButtonLink>
                <Table
                    head={
                        <Tr>
                            <Th textAlign="center">No.</Th>
                            <Th textAlign="center">Name</Th>
                            <Th textAlign="center">Age</Th>
                            <Th textAlign="center">Nationality</Th>
                            <Th textAlign="center">Action</Th>
                        </Tr>
                    }
                    body={lists.map((item) => {
                        return (
                            <Tr key={item.id}>
                                <Td textAlign="center">{++count}</Td>
                                <Td textAlign="center">{item.name}</Td>
                                <Td textAlign="center">{item.age}</Td>
                                <Td textAlign="center">{item.nationality}</Td>
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
