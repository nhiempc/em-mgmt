import { useState } from 'react';

const usePagination = ({ pageCount }) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(pageCount || 10);

    const _changePage = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    const _changePerPage = (newPerPage) => {
        setPerPage(newPerPage);
        setPage(1);
        window.scrollTo(0, 0);
    };

    return {
        page,
        perPage,
        _changePage,
        _changePerPage
    };
};

export default usePagination;
