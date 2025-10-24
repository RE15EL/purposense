"use client";

import { useState } from "react";

import { toast } from "sonner";
import { AppState, Assumption, Certainty, UIState } from "@/types";

export const useAppState = () => {
  const initial = {
    reason: "",
    people: [],
    assumptions: [],
    directOutcomes: [],
    indirectOutcomes: [],
    ultimateImpact: [],
  };
  
  const [state, setState] = useState<AppState>(initial);
  const [initialState, setInitialState] = useState<AppState>(state);
  const [uiState, setUiState] = useState<UIState>({
    expandedOutcomeId: null,
    editingId: null,
    editingType: null,
    showMoreDirect: false,
    showMoreIndirect: false,
    showMoreUltimate: false,
  });

  const isDirty = JSON.stringify(state) !== JSON.stringify(initialState);

  const resetDirtyState = () => setInitialState(initial);

  const addTag = (tag: string) => {
    const normalized = tag.toLowerCase().trim();
    if (!normalized || state.people.find((p) => p.toLowerCase() === normalized))
      return;
    setState((s) => ({ ...s, people: [...s.people, tag.trim()] }));
  };

  const removeTag = (index: number) => {
    setState((s) => ({ ...s, people: s.people.filter((_, i) => i !== index) }));
  };

  const addAssumption = (description: string, certainty: Certainty) => {
    if (!description.trim()) return;

    setState((s) => ({
      ...s,
      assumptions: [
        ...s.assumptions,
        {
          id: Date.now().toString(),
          description: description.trim(),
          certainty,
        },
      ],
    }));
  };

  const updateAssumption = (id: string, updates: Partial<Assumption>) => {
    setState((s) => ({
      ...s,
      assumptions: s.assumptions.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    }));
  };

  const deleteAssumption = (id: string) => {
    setState((s) => ({
      ...s,
      assumptions: s.assumptions.filter((a) => a.id !== id),
    }));
  };

  const addDirectOutcome = (title: string) => {
    if (!title.trim()) return;
    setState((s) => ({
      ...s,
      directOutcomes: [
        ...s.directOutcomes,
        {
          id: Date.now().toString(),
          title: title.trim(),
          subOutcomes: [],
        },
      ],
    }));
  };

  const deleteDirectOutcome = (id: string) => {
    setState((s) => ({
      ...s,
      directOutcomes: s.directOutcomes.filter((o) => o.id !== id),
    }));
  };

  const addSubOutcome = (outcomeId: string, text: string) => {
    if (!text.trim()) return;
    setState((s) => ({
      ...s,
      directOutcomes: s.directOutcomes.map((o) =>
        o.id === outcomeId
          ? {
              ...o,
              subOutcomes: [
                ...o.subOutcomes,
                { id: Date.now().toString(), text: text.trim() },
              ],
            }
          : o
      ),
    }));
  };

  const updateSubOutcome = (outcomeId: string, subId: string, text: string) => {
    setState((s) => ({
      ...s,
      directOutcomes: s.directOutcomes.map((o) =>
        o.id === outcomeId
          ? {
              ...o,
              subOutcomes: o.subOutcomes.map((sub) =>
                sub.id === subId ? { ...sub, text } : sub
              ),
            }
          : o
      ),
    }));
  };

  const deleteSubOutcome = (outcomeId: string, subId: string) => {
    setState((s) => ({
      ...s,
      directOutcomes: s.directOutcomes.map((o) =>
        o.id === outcomeId
          ? {
              ...o,
              subOutcomes: o.subOutcomes.filter((sub) => sub.id !== subId),
            }
          : o
      ),
    }));
  };

  const addIndirectOutcome = (text: string) => {
    if (!text.trim()) return;
    setState((s) => ({
      ...s,
      indirectOutcomes: [
        ...s.indirectOutcomes,
        { id: Date.now().toString(), text: text.trim() },
      ],
    }));
  };

  const updateIndirectOutcome = (id: string, text: string) => {
    setState((s) => ({
      ...s,
      indirectOutcomes: s.indirectOutcomes.map((item) =>
        item.id === id ? { ...item, text } : item
      ),
    }));
  };

  const deleteIndirectOutcome = (id: string) => {
    setState((s) => ({
      ...s,
      indirectOutcomes: s.indirectOutcomes.filter((item) => item.id !== id),
    }));
  };

  const addUltimateImpact = (text: string) => {
    if (!text.trim()) return;
    setState((s) => ({
      ...s,
      ultimateImpact: [
        ...s.ultimateImpact,
        { id: Date.now().toString(), text: text.trim() },
      ],
    }));
  };

  const updateUltimateImpact = (id: string, text: string) => {
    setState((s) => ({
      ...s,
      ultimateImpact: s.ultimateImpact.map((item) =>
        item.id === id ? { ...item, text } : item
      ),
    }));
  };

  const deleteUltimateImpact = (id: string) => {
    setState((s) => ({
      ...s,
      ultimateImpact: s.ultimateImpact.filter((item) => item.id !== id),
    }));
  };

  const handleSave = () => {
    const output = {
      reason: state.reason,
      people: state.people,
      assumptions: state.assumptions,
      directOutcomes: state.directOutcomes,
      indirectOutcomes: state.indirectOutcomes,
      ultimateImpact: state.ultimateImpact,
    };

    console.log(
      "💾 Theory of Change - Saved Data:",
      JSON.stringify(output, null, 2)
    );

    toast.success("Changes saved successfully!");

    resetDirtyState();
  };

  return {
    // State
    state,
    setState,
    uiState,
    setUiState,
    isDirty,

    // People (Tags)
    addTag,
    removeTag,

    // Assumptions
    addAssumption,
    updateAssumption,
    deleteAssumption,

    // Direct Outcomes
    addDirectOutcome,
    deleteDirectOutcome,
    addSubOutcome,
    updateSubOutcome,
    deleteSubOutcome,

    // Indirect Outcomes
    addIndirectOutcome,
    updateIndirectOutcome,
    deleteIndirectOutcome,

    // Ultimate Impact
    addUltimateImpact,
    updateUltimateImpact,
    deleteUltimateImpact,

    // Save
    handleSave,
  };
};
