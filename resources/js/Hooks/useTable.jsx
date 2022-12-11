import OutlineInput from "@/Components/Admin/OutlineInput";
import OutlineSelect from "@/Components/Admin/OutlineSelect";
import {
    Grid,
    Table as ChakraTable,
    TableContainer,
    Tbody,
    Thead,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import useNextLeftPagination from "./useNextLeftPagination";

export default function useTable(data, url) {
    const [perPage, setPerpage] = useState(5);
    const { element, lists, startCount } = useNextLeftPagination(data, perPage);
    let count = startCount;

    const onPerPageChange = (e) => {
        setPerpage(e.target.value);
    };

    const onSearch = (e) => {
        if ("code" in e && e.code !== "Enter") {
            return;
        }

        return Inertia.get(
            route(url, {
                search: e.target.value,
            })
        );
    };

    let currentUrl = new URL(window.location.href);
    let searchValue = currentUrl.searchParams.get("search");

    const topTable = (
        <Grid templateColumns={{ base: "70px 1fr", lg: "120px 1fr" }}>
            <OutlineSelect onChange={onPerPageChange} value={perPage}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </OutlineSelect>
            <OutlineInput
                onKeyDown={onSearch}
                placeholder="Search"
                mb={10}
                defaultValue={searchValue}
            />
        </Grid>
    );

    const Table = ({ head, body }) => (
        <>
            {topTable}
            <TableContainer>
                <ChakraTable>
                    <Thead>{head}</Thead>
                    <Tbody>{body}</Tbody>
                </ChakraTable>
            </TableContainer>
            {element}
        </>
    );

    return {
        Table,
        getCount: () => count,
        lists,
    };
}
