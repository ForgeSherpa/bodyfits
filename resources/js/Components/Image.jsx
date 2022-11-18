import { Image as ImageChakra } from "@chakra-ui/react";

export default function Image({ src, outSide = null, ...props }) {
    let link = "storage/images/";
    if (!outSide) {
        link += src;
    }

    return (
        <ImageChakra
            src={outSide ? outSide : link}
            {...props}
            fallbackSrc="storage/images/fallback.webp"
        />
    );
}
