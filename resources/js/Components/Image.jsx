import { Image as ImageChakra } from "@chakra-ui/react";

export default function Image({
    src,
    outSide = null,
    query = null,
    noWebp = false,
    ...props
}) {
    return (
        <ImageChakra
            src={
                outSide
                    ? outSide
                    : route("image", {
                          path: src,
                          fm: noWebp ? undefined : "webp",
                      }) + `${query ? `&${query}` : ""}`
            }
            {...props}
            fallbackSrc={route("image", "fallback.webp")}
        />
    );
}
