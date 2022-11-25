import { useState, useEffect, useReducer } from "react";

const listsReducer = (state, action) => {
    switch (action.type) {
        case "setData":
            if (state.firstFetch) {
                return { data: action.payload, firstFetch: false };
            }
            return {
                data: [...state.data, ...action.payload],
                firstFetch: state.firstFetch,
            };
        default:
            return { data: state.data, firstFetch: state.firstFetch };
    }
};

export default function usePagination(item, initialNotSame = true) {
    const [hasNext, setHasNext] = useState(true);
    const [lists, dispatchLists] = useReducer(listsReducer, {
        data: item.data,
        firstFetch: initialNotSame,
    });
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setLimit(item.last_page);
    }, []);

    const next = async () => {
        setLoading(true);
        const res = await fetch(
            `${item.path}?page=${current + 1}&per_page=15`,
            {
                headers: {
                    Accept: "applicaton/json",
                },
            }
        );
        const json = await res.json();
        setCurrent(json.current_page);
        setLimit(json.last_page);
        setLoading(false);
        dispatchLists({ type: "setData", payload: json.data });
    };

    useEffect(() => {
        console.log(current, limit);
        if (limit !== false && current === limit) {
            setHasNext(false);
        }
    }, [item, lists]);

    return {
        hasNext,
        next,
        loading,
        lists: lists.data,
    };
}
