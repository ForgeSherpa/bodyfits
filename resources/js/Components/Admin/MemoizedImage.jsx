import { memo } from "react";
import Image from "../Image";

const MemoizedImage = ({ photo, data }) => {
    return (
        <Image
            outSide={
                (photo && URL.createObjectURL(photo)) ||
                (data
                    ? route("image", data.photo)
                    : route("image", "fallback.webp"))
            }
        />
    );
};

export default memo(MemoizedImage);
