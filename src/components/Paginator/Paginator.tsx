"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatorProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25];

export const Paginator = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginatorProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    onItemsPerPageChange(value);

    const newTotalPages = Math.ceil(totalItems / value);
    if (currentPage > newTotalPages) {
      onPageChange(newTotalPages || 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-gray-200">
      <div className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-medium">
          {currentPage} – {itemsPerPage}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="rows-per-page" className="text-sm text-gray-700">
            Rows per page
          </label>
          <select
            id="rows-per-page"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`p-1.5 rounded-md transition ${
              canGoPrevious
                ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-sm text-gray-700 min-w-[100px] text-center">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages || 1}</span>
          </span>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`p-1.5 rounded-md transition ${
              canGoNext
                ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
