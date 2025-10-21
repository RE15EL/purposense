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
  } = useAppState();

  const [editingAssumptionId, setEditingAssumptionId] = useState<string | null>(
    null
  );

  const handleSave = () => {
    console.log("Save changes", { state });
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          setShowMore={(val:boolean) =>
            setUiState((s) => ({ ...s, showMoreDirect: val }))
          }
        />

        {/* <EditableListCard
          title="Indirect outcomes"
          zone="Zone of indirect influence"
          items={state.indirectOutcomes}
          onAdd={addIndirectOutcome}
          onUpdate={updateIndirectOutcome}
          onDelete={deleteIndirectOutcome}
          editingId={uiState.editingId}
          setEditingId={(id) =>
            setUiState((s) => ({ ...s, editingId: id }))
          }
          showMore={uiState.showMoreIndirect}
          setShowMore={(val) =>
            setUiState((s) => ({ ...s, showMoreIndirect: val }))
          }
        /> */}
      </div>

      {/* save */}
      <div className="text-end mt-6">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default TheoryOfChange;
