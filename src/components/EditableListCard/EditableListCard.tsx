"use client";

import { CardItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import { FixedHeightCard } from "../FixedHeightCard/FixedHeightCard";
import { Edit2, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { IndirectOutcomesIcon, UltimateImpactIcon } from "../Icons/Icons";

interface EditableListCardProps {
  title: string;
  type?: "indirect_outcomes" | "ultimate_impact";
  description: string;
  zonePill: string;
  items: CardItem[];
  onAdd: (text: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const EditableListCard = ({
  title,
  description,
  zonePill,
  items,
  onAdd,
  onUpdate,
  onDelete,
  type = "indirect_outcomes",
}: EditableListCardProps) => {
  const [newItemText, setNewItemText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showMore, setShowMore] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const visibleCount = showMore ? items.length : Math.min(3, items.length);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [editingId]);

  const handleShowMore = () => {
    if (!showMore && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else if (showMore && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowMore(!showMore);
  };

  const startEdit = (id: string | null, currentText: string) => {
    setEditingId(id);
    setEditValue(currentText);
  };

  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      onUpdate(id, editValue.trim());
    }
    setEditingId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div >
      <div className="flex justify-center items-center lg:hidden w-full scale-60">
        {type === "indirect_outcomes" ? (
          <IndirectOutcomesIcon />
        ) : (
          <UltimateImpactIcon />
        )}
      </div>

      <FixedHeightCard
        title={title}
        description={description}
        zonePill={zonePill}
        dashed={true}
      >
        <div
          ref={containerRef}
          className="h-64 overflow-auto scrollbar-hide p-4 space-y-1"
        >
          {items.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="flex gap-2 items-center p-3 bg-gray-50  border-b border-gray-200"
            >
              {editingId === item.id ? (
                <Input
                  ref={editInputRef}
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveEdit(item.id);
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      cancelEdit();
                    }
                  }}
                  className="flex-1 p-2 text-sm"
                />
              ) : (
                <span className="text-sm text-gray-700 flex-1">
                  {item.text}
                </span>
              )}
              <button
                onClick={() => startEdit(item.id, item.text)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <Input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newItemText.trim()) {
                    onAdd(newItemText.trim());
                    setNewItemText("");
                  }
                }
              }}
              placeholder="Type and press Enter to add..."
              className="flex-1 p-2 text-sm"
            />
          </div>
        </div>

        {items.length > 3 && (
          <div className="p-3">
            <button
              onClick={handleShowMore}
              className="w-full text-sm text-brand hover:text-brand/80 hover:cursor-pointer font-medium transition-colors"
            >
              {showMore ? "Show less ↑" : "Show more ↓"}
            </button>
          </div>
        )}
      </FixedHeightCard>
    </div>
  );
};
