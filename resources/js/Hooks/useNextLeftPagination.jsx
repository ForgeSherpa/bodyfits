import Button from "@/Components/Admin/Button";
import { Flex } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import usePagination from "./usePagination";

export default function useNextLeftPagination(data, perPage = 5) {
    const { lists, loading, hasNext, next, hasPrevious, previous } =
        usePagination(data, { perPage, startPage: 1, replace: true });

    return {
        element: (
            <Flex
                gap={{ base: 3, lg: 10 }}
                justifyContent={{ base: "none", lg: "center" }}
                my={1}
            >
                {hasPrevious && (
                    <Button isLoading={loading} onClick={previous}>
                        <FiArrowLeft />
                    </Button>
                )}
                {hasNext && (
                    <Button onClick={next} isLoading={loading}>
                        <FiArrowRight />
                    </Button>
                )}
            </Flex>
        ),
        lists,
        loading,
        hasNext,
        next,
        hasPrevious,
        previous,
    };
}
