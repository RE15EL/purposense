"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Hint } from "../Hint/Hint";
import { TagsContainer } from "./TagsContainer";

interface TagProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
}

export const PeopleTags = ({ tags, onAdd, onRemove }: TagProps) => {
  const [input, setInput] = useState<string>("");
  const showTags = tags.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onAdd(input);
      setInput("");
      e.preventDefault();
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemove(tags.length - 1);
    }
  };

  return (
    <Card className="gap-1.5">
      <CardHeader>
        <CardTitle>The people we serve</CardTitle>
      </CardHeader>

      <CardContent>
        {showTags && <TagsContainer tags={tags} onRemove={onRemove} />}

        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a person (press Enter)"
          className="w-full text-sm mb-1.5"
        />

        <Hint caption="Add each participant type and press Enter" />
      </CardContent>
    </Card>
  );
};
