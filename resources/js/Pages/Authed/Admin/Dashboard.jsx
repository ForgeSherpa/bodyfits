import ManageAccount from "@/Components/Admin/Dashboard/ManageAccount";
import OutlineCard from "@/Components/Admin/OutlineCard";
import StatsCard from "@/Components/Admin/StatsCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { Flex } from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

export default function Dashboard({ auth }) {
    return (
        <AdminLayout>
            <div className="flex flex-col items-center lg:flex-row gap-3">
                <OutlineCard
                    header="Admin Panel"
                    body="Welcome to Admin Panel of BodyFits!"
                >
                    <Flex alignItems="center" gap={3}>
                        <FiInfo /> Web Up and Running.
                    </Flex>
                </OutlineCard>
                <StatsCard
                    header="Feedbacks"
                    body="New Feedback Arrived"
                    count={3}
                />
                <StatsCard
                    header="Users"
                    body="Users Counts last 1 week"
                    count={10}
                />
            </div>
            <ManageAccount auth={auth} />
        </AdminLayout>
    );
}
