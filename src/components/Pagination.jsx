// components/Pagination.jsx
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (any, i) => i + 1);

  return (
    <div className="flex gap-2 justify-center mt-8">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded border ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
export default Pagination;
