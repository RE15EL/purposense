"use client";

import { useFlowSteps } from "@/hooks/useFlowSteps";

export const FlowIndicator = () => {
  const flowSteps = useFlowSteps();
  return (
    <div className="w-full hidden lg:block">
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full ">
        {flowSteps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white border border-brand flex items-center justify-center text-brand shadow-lg">
              {step.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-2 bg-brand" />
    </div>
  );
};
