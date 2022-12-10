import { Inertia } from "@inertiajs/inertia";
import { useCallback } from "react";

export default function useOpenDetail(url) {
    const openDetail = (id) => {
        Inertia.get(route(url, id));
    };

    return useCallback(openDetail, [url]);
}
