import { COLORS } from "@/Utils/colors";
import { useLayoutEffect } from "react";

export default function useCustomBg(color = null) {
    useLayoutEffect(() => {
        document.body.style.backgroundColor = color ? color : COLORS.itemTerang;
    }, []);
}
