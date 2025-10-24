"use client";

interface ShowMoreOrLess {
  showMore: boolean;
  handleShowMore: () => void;
}

export const ShowMoreOrLess = ({
  showMore,
  handleShowMore,
}: ShowMoreOrLess) => {
  return (
    <div className="p-3 border-t border-gray-200">
      <button
        onClick={handleShowMore}
        className="w-full text-sm text-brand hover:text-brand/80 font-medium transition-colors"
      >
        {showMore ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
};
