"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CERTAINTY_COLORS, CERTAINTY_LABELS } from "@/lib/constants";
import { Check, Edit2, Trash2 } from "lucide-react";
import { Assumption, Certainty } from "@/types";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
  const [newDescription, setNewDescription] = useState("");
  const [newCertainty, setNewCertainty] = useState<Certainty>("all");
  const [showCertaintyError, setShowCertaintyError] = useState(false);
  const [editValue, setEditValue] = useState("");

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

  const isAddEnabled =
    newDescription.trim().length > 0 && newCertainty !== "all";

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
              {assumptions.map((assumption) => (
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
                    <select
                      value={assumption.certainty}
                      onChange={(e) =>
                        onUpdate(assumption.id, {
                          certainty: e.target.value as Certainty,
                        })
                      }
                      className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer ${
                        CERTAINTY_COLORS[assumption.certainty]
                      }`}
                    >
                      {Object.entries(CERTAINTY_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingId(assumption.id);
                          setEditValue(assumption.description);
                        }}
                        className="text-gray-600 hover:text-purple-600 transition"
                        aria-label="Edit assumption"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(assumption.id)}
                        className="text-gray-600 hover:text-red-600 transition"
                        aria-label="Delete assumption"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              <tr className="border-b border-gray-200 bg-gray-50/30">
                <td className="p-3">
                  <InputGroup>
                    <InputGroupInput
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
                  <select
                    value={newCertainty}
                    onChange={(e) =>
                      handleCertaintyChange(e.target.value as Certainty)
                    }
                    className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer transition ${
                      showCertaintyError
                        ? "border-destructive text-destructive bg-red-50"
                        : CERTAINTY_COLORS[newCertainty]
                    }`}
                    aria-label="Select certainty level"
                    aria-invalid={showCertaintyError}
                  >
                    {Object.entries(CERTAINTY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleAddRow}
                      disabled={!isAddEnabled}
                      className={`transition ${
                        !isAddEnabled && "text-gray-300 cursor-not-allowed "
                      }`}
                      aria-label="Add assumption"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={resetStates}
                      disabled={!isAddEnabled}
                      className={`transition ${
                        isAddEnabled
                          ? "text-red-600 hover:text-red-700 cursor-pointer"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Clear input"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
