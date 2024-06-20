import React from "react";
import ReactPaginate from "react-paginate";

const ReactPagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={6}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
        />
    );
};

export default ReactPagination;
