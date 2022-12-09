import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";

export default function OutlineCard({ header, body, children, ...props }) {
    return (
        <Card
            shadow="none"
            rounded={3}
            className="border border-zinc-500 my-2 lg:m-3 p-1"
            w={300}
            {...props}
        >
            <CardHeader p={1} pb={0}>
                <Text color="gray.600">{header}</Text>
            </CardHeader>
            <CardBody pt={0} p={1}>
                <Text fontWeight={600} fontSize="lg">
                    {body}
                </Text>
            </CardBody>
            <CardFooter display="block" pt={3} p={1}>
                {children}
            </CardFooter>
        </Card>
    );
}
