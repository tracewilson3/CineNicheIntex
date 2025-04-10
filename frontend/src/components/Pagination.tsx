// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   pageSize: number;
//   onPageChange: (newPage: number) => void;
//   onPageSizeChange: (newPageSize: number) => void;
// }

// const Pagination = ({
//   currentPage,
//   totalPages,
//   pageSize,
//   onPageChange,
//   onPageSizeChange,
// }: PaginationProps) => {
//   return (
//     <div className="flex item-center justify-center mt-4">
//       {/* Display page navigation dynamically */}
//       <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
//         Previous
//       </button>

//       {/* Dynamically display the buttons to navigate to each page, depending on pageSize and totalPages */}
//       {[...Array(totalPages)].map((_, i) => (
//         <button key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currentPage === i + 1}>
//           {i + 1}
//         </button>
//       ))}

//       <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
//         Next
//       </button>

//       <br />

//       {/* Option to change the number of results per page */}
//       <label>Results per page: </label>
//       <select
//         value={pageSize}
//         onChange={(p) => {
//           onPageSizeChange(Number(p.target.value)); //change the value stored in pageSize, triggers useEffect
//           onPageChange(1);
//         }}
//       >
//         <option value="5">5</option>
//         <option value="10">10</option>
//         <option value="20">20</option>
//       </select>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

// Helper function to generate visible page numbers with ellipses
const getPageNumbers = (current: number, total: number): (number | "...")[] => {
  const delta = 2;
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1); // always show first page

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total); // always show last page
  }

  return range;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 py-1 border rounded"
      >
        Previous
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
            className={`px-2 py-1 border rounded ${
              currentPage === page ? "bg-blue-500 text-white font-bold" : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1 border rounded"
      >
        Next
      </button>

      <label className="ml-4">
        Results per page:{" "}
        <select
          className="ml-2"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // Reset to page 1 when changing size
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
