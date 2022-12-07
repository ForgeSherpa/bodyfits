import { Skeleton, CardBody, Box, SkeletonCircle } from "@chakra-ui/react";
import Card from "../Card";

export default function CourseLoading() {
    return (
        <Card w={582} h={342}>
            <CardBody py={2} px={1}>
                <Skeleton
                    height={159}
                    width={577}
                    rounded={40}
                    borderBottomRadius={0}
                />
                <Box position="relative" px={35} py={3}>
                    <Skeleton height={10} width="full" />
                    <Skeleton height={3} mt={3} width="full" />
                    <SkeletonCircle
                        height={10}
                        width={10}
                        position="absolute"
                        right={10}
                        bottom={-14}
                    />
                </Box>
            </CardBody>
        </Card>
    );
}
