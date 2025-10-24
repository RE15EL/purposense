"use client";

import { useState } from "react";

//hooks
import { useAppState } from "@/hooks/useAppState";

// components
import { PageTitle } from "../PageTitle/PageTitle";
import { ReasonSection } from "../Reason/Reason";
import { PeopleTags } from "../Tag/PeopleTags";
import { Button } from "../ui/button";
import { AssumptionsTable } from "../Assumptions/Assumptions";
import { DirectOutcomesCard } from "../DirectOutcomesCard/DirectOutcomesCard";
import { ProgrammesCard } from "../ProgrammesCard/ProgrammesCard";
import { EditableListCard } from "../EditableListCard/EditableListCard";
import { indirectOutcomesMock } from "@/lib/mocks/indirectOutcomes";
import { CardItem, DirectOutCome } from "@/types";
import { directOutComesMock } from "@/lib/mocks/directOutcomes";
import { ultimateImpactMock } from "@/lib/mocks/ultimateImpact";
import { FlowIndicator } from "../FlowIndicator/FlowIndicator";

const TheoryOfChange = () => {
  const {
    state,
    setState,
    addTag,
    removeTag,
    addAssumption,
    deleteAssumption,
    updateAssumption,
    addDirectOutcome,
    deleteDirectOutcome,
    addSubOutcome,
    updateSubOutcome,
    deleteSubOutcome,
    uiState,
    setUiState,
    isDirty,
    handleSave,
  } = useAppState();

  const [editingAssumptionId, setEditingAssumptionId] = useState<string | null>(
    null
  );

  const [directOutcomes, setDirectOutcomes] =
    useState<DirectOutCome[]>(directOutComesMock);

  const [indirectOutcomes, setIndirectOutcomes] =
    useState<CardItem[]>(indirectOutcomesMock);

  const [ultimateImpact, setUltimateImpact] =
    useState<CardItem[]>(ultimateImpactMock);

  // Indirect Outcomes handlers
  const addIndirectOutcome = (text: string) => {
    setIndirectOutcomes([
      ...indirectOutcomes,
      { id: Date.now().toString(), text },
    ]);
  };

  const updateIndirectOutcome = (id: string, text: string) => {
    setIndirectOutcomes(
      indirectOutcomes.map((i) => (i.id === id ? { ...i, text } : i))
    );
  };

  const deleteIndirectOutcome = (id: string) => {
    setIndirectOutcomes(indirectOutcomes.filter((i) => i.id !== id));
  };

  // Ultimate Impact handlers
  const addUltimateImpact = (text: string) => {
    setUltimateImpact([...ultimateImpact, { id: Date.now().toString(), text }]);
  };

  const updateUltimateImpact = (id: string, text: string) => {
    setUltimateImpact(
      ultimateImpact.map((i) => (i.id === id ? { ...i, text } : i))
    );
  };

  const deleteUltimateImpact = (id: string) => {
    setUltimateImpact(ultimateImpact.filter((i) => i.id !== id));
  };

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6 space-y-4">
      <PageTitle
        title="Theory of Change"
        subtitle="Build your organizational impact framework"
        containerClassName="mb-8"
      />

      <div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* The reason we exist */}
          <ReasonSection state={state} setState={setState} />

          {/* The people we serve */}
          <PeopleTags tags={state.people} onAdd={addTag} onRemove={removeTag} />
        </div>
      </div>

      <AssumptionsTable
        assumptions={state.assumptions}
        onAdd={addAssumption}
        onUpdate={updateAssumption}
        onDelete={deleteAssumption}
        editingId={editingAssumptionId}
        setEditingId={setEditingAssumptionId}
      />

      {/* Flow Indicator  */}
      <FlowIndicator />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProgrammesCard />

        <DirectOutcomesCard
          outcomes={state.directOutcomes}
          onAddOutcome={addDirectOutcome}
          onDeleteOutcome={deleteDirectOutcome}
          onAddSubOutcome={addSubOutcome}
          onUpdateSubOutcome={updateSubOutcome}
          onDeleteSubOutcome={deleteSubOutcome}
          expandedId={uiState.expandedOutcomeId}
          setExpandedId={(id: string | null) =>
            setUiState((s) => ({ ...s, expandedOutcomeId: id }))
          }
          editingId={uiState.editingId}
          setEditingId={(id: string | null) =>
            setUiState((s) => ({ ...s, editingId: id }))
          }
          showMore={uiState.showMoreDirect}
          setShowMore={(val: boolean) =>
            setUiState((s) => ({ ...s, showMoreDirect: val }))
          }
        />

        <EditableListCard
          title="Indirect outcomes"
          description="What we contribute over time"
          zonePill="Zone of indirect influence"
          type="indirect_outcomes"
          items={indirectOutcomes}
          onAdd={addIndirectOutcome}
          onUpdate={updateIndirectOutcome}
          onDelete={deleteIndirectOutcome}
        />

        <EditableListCard
          title="Ultimate impact"
          description="The lasting change we seek"
          zonePill="Zone of contribution"
          type="ultimate_impact"
          items={ultimateImpact}
          onAdd={addUltimateImpact}
          onUpdate={updateUltimateImpact}
          onDelete={deleteUltimateImpact}
        />
      </div>

      {/* save */}
      <div className="text-end mt-6">
        <Button
          onClick={handleSave}
          disabled={!isDirty}
          aria-label="Save changes"
        >
          Save
        </Button>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TheoryOfChange;
