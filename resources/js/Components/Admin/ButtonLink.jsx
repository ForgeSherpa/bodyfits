import { Inertia } from "@inertiajs/inertia";
import Button from "./Button";

export default function ButtonLink({ url, children, ...props }) {
    return (
        <Button {...props} onClick={() => Inertia.get(route(url))}>
            {children}
        </Button>
    );
}
