import { Inertia } from "@inertiajs/inertia";
import { FiArrowLeft } from "react-icons/fi";
import Button from "./Button";

export default function BackButton({ url, variant = "default" }) {
    return (
        <Button variant={variant} onClick={() => Inertia.visit(route(url))}>
            <FiArrowLeft /> Back
        </Button>
    );
}
