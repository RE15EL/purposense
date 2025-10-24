"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown, Edit2, Trash2 } from "lucide-react";
import { FixedHeightCard } from "../FixedHeightCard/FixedHeightCard";
import { ShowMoreOrLess } from "../ShowMoreOrLess/ShowMoreOrLess";
import { DirectOutcome } from "@/types";
import { DirectOutcomesIcon } from "../Icons/Icons";
import { toast } from "sonner";

interface DirectOutcomesCardProps {
  outcomes: DirectOutcome[];
  onAddOutcome: (title: string) => void;
  onDeleteOutcome: (id: string) => void;
  onAddSubOutcome: (outcomeId: string, text: string) => void;
  onUpdateSubOutcome: (outcomeId: string, subId: string, text: string) => void;
  onDeleteSubOutcome: (outcomeId: string, subId: string) => void;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  showMore: boolean;
  setShowMore: (val: boolean) => void;
}

export const DirectOutcomesCard = ({
  outcomes,
  onAddOutcome,
  onDeleteOutcome,
  onAddSubOutcome,
  onUpdateSubOutcome,
  onDeleteSubOutcome,
  expandedId,
  setExpandedId,
  editingId,
  setEditingId,
  showMore,
  setShowMore,
}: DirectOutcomesCardProps) => {
  const [newOutcomeTitle, setNewOutcomeTitle] = useState("");
  const [newSubOutcomeText, setNewSubOutcomeText] = useState<
    Record<string, string>
  >({});
  const [editValue, setEditValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const visibleCount = showMore
    ? outcomes.length
    : Math.min(3, outcomes.length);

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

  const saveEdit = (outcomeId: string, subId: string) => {
    if (editValue.trim()) {
      onUpdateSubOutcome(outcomeId, subId, editValue.trim());
    }
    setEditingId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleAddNewOutcome = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = newOutcomeTitle.trim();

      if (trimmed) {
        const exist = outcomes.some(({ title }) => title === trimmed);
        if (exist) {
          toast.info("There is already one with that title!");
          return;
        }
        onAddOutcome(trimmed);
        setNewOutcomeTitle("");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center lg:hidden w-full scale-60">
        <DirectOutcomesIcon />
      </div>

      <FixedHeightCard
        title="Direct outcomes"
        description="Changes we influence directly"
        zonePill="Zone of direct influence"
      >
        <div className="h-full flex flex-col">
          <div
            ref={containerRef}
            className="h-60 p-4 space-y-1 overflow-auto scrollbar-hide"
          >
            {outcomes.slice(0, visibleCount).map((outcome) => (
              <div key={outcome.id} className="group border-b">
                <button
                  onClick={() =>
                    setExpandedId(expandedId === outcome.id ? null : outcome.id)
                  }
                  className="w-full px-1 py-2 flex items-center justify-between group-hover:bg-brand/10 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-500">
                    {outcome.title}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      expandedId === outcome.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === outcome.id && (
                  <div className="group-hover:bg-brand/10 p-3 space-y-2 ">
                    {outcome.subOutcomes.map((sub) => (
                      <div key={sub.id} className="flex gap-2 items-center">
                        {editingId === sub.id ? (
                          <Input
                            ref={editInputRef}
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                saveEdit(outcome.id, sub.id);
                              } else if (e.key === "Escape") {
                                e.preventDefault();
                                cancelEdit();
                              }
                            }}
                            className="flex-1 p-2 text-sm"
                          />
                        ) : (
                          <span className="text-sm text-gray-700 flex-1">
                            {sub.text}
                          </span>
                        )}

                        <div className="flex gap-2 justify-center items-center">
                          <button
                            onClick={() => startEdit(sub.id, sub.text)}
                            className="text-gray-400 hover:text-gray-600 transition-colors "
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            onClick={() =>
                              onDeleteSubOutcome(outcome.id, sub.id)
                            }
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 mt-3">
                      <Input
                        type="text"
                        value={newSubOutcomeText[outcome.id] || ""}
                        onChange={(e) =>
                          setNewSubOutcomeText({
                            ...newSubOutcomeText,
                            [outcome.id]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const text = newSubOutcomeText[outcome.id] || "";

                            if (!text) return;

                            const exist = outcome.subOutcomes.some(
                              (sub) =>
                                sub.text.toLowerCase() === text.toLowerCase()
                            );

                            if (exist) {
                              toast.info(
                                "A suboutcome with that text already exists!"
                              );
                              return;
                            }

                            if (text.trim()) {
                              onAddSubOutcome(outcome.id, text.trim());
                              setNewSubOutcomeText({
                                ...newSubOutcomeText,
                                [outcome.id]: "",
                              });
                            }
                          }
                        }}
                        placeholder="Add sub-outcome..."
                        className="flex-1 p-2 text-sm"
                      />

                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => onDeleteOutcome(outcome.id)}
                        className="px-4 text-gray-400 hover:text-red-600 hover:bg-transparent transition-colors"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-2">
              <Input
                type="text"
                value={newOutcomeTitle}
                onChange={(e) => setNewOutcomeTitle(e.target.value)}
                onKeyDown={(e) => handleAddNewOutcome(e)}
                placeholder="Add new outcome..."
                className="flex-1 p-2 text-sm mt-2"
              />
            </div>
          </div>

          {outcomes.length > 3 && (
            <ShowMoreOrLess
              showMore={showMore}
              handleShowMore={handleShowMore}
            />
          )}
        </div>
      </FixedHeightCard>
    </div>
  );
};
