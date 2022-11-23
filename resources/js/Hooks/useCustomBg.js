import { COLORS } from "@/Utils/colors";
import { useLayoutEffect } from "react";

export default function useCustomBg() {
    useLayoutEffect(() => {
        document.body.style.backgroundColor = COLORS.itemTerang;
    }, []);
}
