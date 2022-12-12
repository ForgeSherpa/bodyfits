import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

const SelectAutocomplete = ({
    data,
    title,
    heading,
    onChange,
    value,
    name,
    initialData,
    error,
}) => {
    const [query, setQuery] = useState("");

    const filteredData = data.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <Box>
            <Text mb={2}>{heading}</Text>
            <Combobox value={value} name={name} onChange={onChange}>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    className={
                        error ? "border border-red-400" : "border border-black"
                    }
                    px={3}
                    w="full"
                >
                    <Combobox.Input
                        name={name}
                        onChange={(event) => setQuery(event.target.value)}
                        className="py-2 bg-transparent focus:outline-none"
                        placeholder={initialData}
                        value={query}
                    />
                    <FiChevronDown />
                </Flex>
                <Combobox.Options className="py-2 px-3 text-black border border-black">
                    {filteredData.map((data) => (
                        <Combobox.Option
                            className="p-1 border-b border-b-transparent hover:cursor-pointer border-t border-t-transparent hover:border-t-black hover:border-b-black transition-all delay-100 "
                            key={data.id}
                            value={data}
                            onClick={() => setQuery(data[title])}
                        >
                            {data[title]}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
            {error && <Text color="red.400">{error}</Text>}
        </Box>
    );
};

export default React.memo(SelectAutocomplete);
