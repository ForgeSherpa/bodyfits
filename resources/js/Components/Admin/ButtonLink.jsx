import { Inertia } from "@inertiajs/inertia";
import Button from "./Button";

export default function ButtonLink({ url, params = null, children, ...props }) {
    return (
        <Button {...props} onClick={() => Inertia.get(route(url, params))}>
            {children}
        </Button>
    );
}
