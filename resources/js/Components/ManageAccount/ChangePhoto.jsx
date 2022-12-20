import { COLORS } from "@/Utils/colors";
import { makeToast } from "@/Utils/toast";
import { Alert, Box, Input } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useRef, useState } from "react";
import Image from "../Image";
import WhiteText from "../WhiteText";

export default function ChangePhoto({ photo }) {
    const photoInputRef = useRef(null);
    const photoReaderRef = useRef(null);
    const [photoUrl, setPhotoUrl] = useState("");

    const handlePhotoClick = () => {
        photoInputRef.current.click();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        Inertia.post(
            route("profile.changePhoto"),
            {
                photo: file,
                _method: "post",
            },
            {
                forceFormData: true,
                onError: (errors) => {
                    makeToast("Something went wrong", "error", errors.photo);
                },
            }
        );
        if (file) {
            photoReaderRef.current = new FileReader();
            photoReaderRef.current.onload = () => {
                setPhotoUrl(photoReaderRef.current.result);
            };
            photoReaderRef.current.readAsDataURL(file);
        }
    };

    return (
        <>
            {!photoUrl && photo.includes("default") && (
                <Alert w="fit-content" rounded="xl" status="info" my={3}>
                    Currently using default photo.
                </Alert>
            )}
            <Box position="relative" w="fit-content" h="fit-content">
                <Input
                    type="file"
                    onChange={handlePhotoChange}
                    ref={photoInputRef}
                    display="none"
                />
                <Image
                    outSide={photoUrl ? photoUrl : `img/${photo}`}
                    w={72}
                    h={72}
                    className="mt-3 object-cover rounded-full"
                />
                <Box
                    position="absolute"
                    _hover={{
                        bg: COLORS.itemSoft,
                        color: "white",
                        cursor: "pointer",
                    }}
                    w="full"
                    h="full"
                    rounded="full"
                    color="transparent"
                    top={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={handlePhotoClick}
                >
                    Change Photo
                </Box>
            </Box>
        </>
    );
}
