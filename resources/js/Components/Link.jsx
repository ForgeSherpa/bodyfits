import { Link as UILink } from "@chakra-ui/react";
import { Link as RouterLink } from "@inertiajs/inertia-react";

export default function Link({ to, ...props }) {
    return <UILink {...props} href={route(to)} as={RouterLink} />;
}
