import { COLORS } from "@/Utils/colors";
import Link from "../Link";

export default function WhiteLink({ to, children, ...props }) {
    return (
        <Link to={to} fontSize={18} color={COLORS.putih} {...props}>
            {children}
        </Link>
    );
}
