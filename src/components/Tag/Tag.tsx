"use client";

import { Badge } from "../ui/badge";

export const Tag = ({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove: () => void;
}) => {
  return (
    <Badge className="px-3 py-1 rounded-full font-bold bg-brand/10 text-brand">
      {tag}

      <button
        onClick={onRemove}
        className="hover:text-purple-900 cursor-pointer"
      >
        ×
      </button>
    </Badge>
  );
};
