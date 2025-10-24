import { FlowStep } from "@/types";
import { ArrowRightLeft, ClipboardList, Target, Users } from "lucide-react";

export const useFlowSteps = () => {
  const FLOW_STEPS: FlowStep[] = [
    {
      id: "programmes",
      icon: <Users size={24} />,
      label: "Programmes",
      color: "text-brand",
    },
    {
      id: "direct",
      icon: <ClipboardList size={24} />,
      label: "Direct outcomes",
      color: "text-brand",
    },
    {
      id: "indirect",
      icon: <ArrowRightLeft size={24} />,
      label: "Indirect outcomes",
      color: "text-brand",
    },
    {
      id: "ultimate",
      icon: <Target size={24} />,
      label: "Ultimate impact",
      color: "text-brand",
    },
  ];

  return FLOW_STEPS;
};
