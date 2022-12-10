import { COLORS } from "@/Utils/colors";
import OutlineCard from "./OutlineCard";

export default function ShadowBox(props) {
    return (
        <OutlineCard
            {...props}
            shadow={COLORS.admin.boxShadow}
            minW="full"
            mt={10}
        />
    );
}
