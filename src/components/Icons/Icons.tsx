import { ArrowRightLeft, ClipboardList, Target, Users } from "lucide-react";
import { FlowIcon } from "../FlowIcon/FlowIcon";

export const ProgrammesIcon = () => <FlowIcon icon={<Users size={24} />} />;

export const DirectOutcomesIcon = () => (
  <FlowIcon icon={<ClipboardList size={24} />} />
);

export const IndirectOutcomesIcon = () => (
  <FlowIcon icon={<ArrowRightLeft size={24} />} />
);

export const UltimateImpactIcon = () => (
  <FlowIcon icon={<Target size={24} />} />
);
