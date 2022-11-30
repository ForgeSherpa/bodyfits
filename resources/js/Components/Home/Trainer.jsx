import { COLORS } from "@/Utils/colors";
import {
    Box,
    Button,
    CardBody,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import Card from "../Card";
import Image from "../Image";
import WhiteDivider from "../WhiteDivider";
import WhiteText from "../WhiteText";

export default function Trainer({ data }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Card
            position="relative"
            bg={COLORS.itemSoft}
            w={431}
            h={520}
            overflow="hidden"
        >
            <CardBody>
                <Image src={data.photo} mx="auto" />
            </CardBody>
            <Box
                position="absolute"
                px={35}
                bg={COLORS.ijoGelapKali}
                bottom={0}
                width="full"
                textAlign="center"
                minH={127}
                py={23}
            >
                <WhiteText fontWeight={600} fontSize={32}>
                    {data.name}
                </WhiteText>
                <Button
                    variant="outline"
                    rounded={36}
                    color={COLORS.putih}
                    colorScheme="whiteAlpha"
                    px={7}
                    onClick={onOpen}
                >
                    See Profile
                </Button>
            </Box>
            <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={COLORS.putihTransparan} />
                <ModalContent bg={COLORS.ijoGelapKali} color={COLORS.putih}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex maxW="full" gap={20} alignItems="center">
                            <Image
                                src={data.photo}
                                query="w=200&h=300"
                                rounded={40}
                                w={200}
                                h={200}
                            />
                            <Box>
                                <Text>Name: {data.name}</Text>
                                <Text>Age: {data.age}</Text>
                                <Text>Nationality: {data.nationality}</Text>
                                <Text>Job: {data.job}</Text>
                                <Text>Contact: {data.contact}</Text>
                                <WhiteDivider mt={5} />
                            </Box>
                        </Flex>
                        <Text mt={3}>{data.description}</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Card>
    );
}
