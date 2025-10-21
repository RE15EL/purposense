"use client";

import { useRef, useState } from "react";

import { Check, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Paginator } from "../Paginator/Paginator";

import { CERTAINTY_COLORS, CERTAINTY_LABELS } from "@/lib/constants";
import { Assumption, Certainty } from "@/types";
import { cn } from "@/lib/utils";

interface AssumptionsTableProps {
  assumptions: Assumption[];
  editingId: string | null;
  onAdd: (description: string, certainty: Certainty) => void;
  onUpdate: (id: string, data: Partial<Assumption>) => void;
  onDelete: (id: string) => void;
  setEditingId: (id: string | null) => void;
}

export const AssumptionsTable = ({
  assumptions,
  onAdd,
  onUpdate,
  onDelete,
  editingId,
  setEditingId,
}: AssumptionsTableProps) => {
  const [newDescription, setNewDescription] = useState<string>("");
  const [newCertainty, setNewCertainty] = useState<Certainty>("all");
  const [showCertaintyError, setShowCertaintyError] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const newDescriptionInputRef = useRef<HTMLInputElement>(null);

  const handleAddRow = () => {
    const trimmed = newDescription.trim();

    if (!trimmed || newCertainty === "all") return;

    onAdd(trimmed, newCertainty);

    resetStates();
  };

  const resetStates = () => {
    setNewDescription("");
    setNewCertainty("all");
    setShowCertaintyError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = newDescription.trim();

      if (trimmed && newCertainty === "all") {
        setShowCertaintyError(true);
        return;
      }

      handleAddRow();
    }
  };

  const handleCertaintyChange = (value: Certainty) => {
    setNewCertainty(value);
    if (value !== "all") {
      setShowCertaintyError(false);
    }
  };

  const handleFocusInput = () => {
    newDescriptionInputRef.current?.focus();
  };

  const isAddEnabled =
    newDescription.trim().length > 0 && newCertainty !== "all";

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAssumptions = assumptions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>What we believe to be true</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto border border-gray-300 rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="p-3 text-left font-semibold text-gray-900">
                  Description
                </th>
                <th className="p-3 text-left font-semibold text-gray-900 w-40">
                  Certainty
                </th>
                <th className="p-3 text-center font-semibold text-gray-900 w-20">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedAssumptions.map((assumption) => (
                <tr
                  key={assumption.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">
                    {editingId === assumption.id ? (
                      <input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            onUpdate(assumption.id, { description: editValue });
                            setEditingId(null);
                          } else if (e.key === "Escape") {
                            setEditingId(null);
                          }
                        }}
                        className="w-full p-2 border border-purple-300 rounded focus:outline-purple-600"
                      />
                    ) : (
                      assumption.description
                    )}
                  </td>

                  <td className="p-3">
                    <Select
                      value={assumption.certainty}
                      onValueChange={(value) =>
                        onUpdate(assumption.id, {
                          certainty: value as Certainty,
                        })
                      }
                      aria-label="Select certainty level"
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          CERTAINTY_COLORS[assumption.certainty]
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CERTAINTY_LABELS).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingId(assumption.id);
                          setEditValue(assumption.description);
                        }}
                        className="text-gray-600 hover:text-purple-600 transition"
                        aria-label="Edit assumption"
                      >
                        <Edit2 />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(assumption.id)}
                        className="text-gray-600 hover:text-red-600 transition"
                        aria-label="Delete assumption"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              <tr className=" border-gray-200 bg-gray-50/30">
                <td className="p-3">
                  <InputGroup>
                    <InputGroupInput
                      ref={newDescriptionInputRef}
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type and press Enter to add..."
                      className="w-full"
                    />

                    <InputGroupAddon align="inline-end">
                      {showCertaintyError ? (
                        <span className="text-destructive text-xs ">
                          Select a certainty level
                        </span>
                      ) : isAddEnabled ? (
                        <Tooltip>
                          <TooltipTrigger
                            onClick={handleAddRow}
                            className="cursor-pointer"
                          >
                            <Check size={16} className="text-brand " />
                          </TooltipTrigger>
                          <TooltipContent className="bg-white border-brand border text-brand shadow-md">
                            <p className="text-brand">Add</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </InputGroupAddon>
                  </InputGroup>
                </td>

                <td className="p-3 relative">
                  <Select
                    value={newCertainty}
                    onValueChange={(value) =>
                      handleCertaintyChange(value as Certainty)
                    }
                    aria-label="Select certainty level"
                    aria-invalid={showCertaintyError}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        showCertaintyError
                          ? "border-destructive text-destructive"
                          : ""
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CERTAINTY_LABELS).map(([key, label]) => (
                        <SelectItem
                          key={key}
                          value={key}
                          disabled={key === "all"}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                <td className="p-3 text-center">
                  <div className="flex justify-center gap-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleFocusInput}
                      disabled={!isAddEnabled}
                      className={`transition ${
                        !isAddEnabled && "text-gray-300 cursor-not-allowed "
                      }`}
                      aria-label="Add assumption"
                    >
                      <Edit2 size={16} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetStates}
                      disabled={!isAddEnabled}
                      className={`transition ${
                        isAddEnabled
                          ? "hover:text-red-700 cursor-pointer"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Clear input"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="border-none">
                <td colSpan={3} className="p-0 m-0 border-0 bg-transparent">
                  <Paginator
                    currentPage={currentPage}
                    totalItems={assumptions.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
