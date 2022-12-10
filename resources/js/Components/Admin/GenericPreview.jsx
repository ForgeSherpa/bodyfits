import AdminLayout from "@/Layouts/AdminLayout";
import { Divider, Text } from "@chakra-ui/react";
import ShadowBox from "./ShadowBox";

export default function GenericPreview({ name, children }) {
    return (
        <AdminLayout>
            <ShadowBox>
                <Text fontSize="2xl" mb={1}>
                    {name}
                </Text>
                <Divider mb={7} borderColor="black" />
                {children}
            </ShadowBox>
        </AdminLayout>
    );
}
