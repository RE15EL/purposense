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

const TheoryOfChange = () => {
  const {
    state,
    setState,
    addTag,
    removeTag,
    addAssumption,
    deleteAssumption,
    updateAssumption,
  } = useAppState();

  const [editingAssumptionId, setEditingAssumptionId] = useState<string | null>(
    null
  );

  const handleSave = () => {
    console.log("Save changes", { state });
  };

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <PageTitle
        title="Theory of Change"
        subtitle="Build your organizational impact framework"
        containerClassName="mb-8"
      />

      <div className="mb-8">
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

      {/* save */}
      <div className="text-end mt-6">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default TheoryOfChange;
