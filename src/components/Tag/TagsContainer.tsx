"use client";

import { Tag } from "./Tag";

interface TagsContainerProps {
  tags: string[];
  onRemove: (index: number) => void;
}

export const TagsContainer = ({ tags, onRemove }: TagsContainerProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} onRemove={() => onRemove(idx)} />
      ))}
    </div>
  );
};
