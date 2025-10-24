export type Certainty =
  | "all"
  | "very_certain"
  | "moderately_certain"
  | "uncertain";

export interface Assumption {
  id: string;
  description: string;
  certainty: Certainty;
}

export interface SubOutcome {
  id: string;
  text: string;
}

export interface DirectOutcome {
  id: string;
  title: string;
  subOutcomes: SubOutcome[];
}

export interface ListItem {
  id: string;
  text: string;
}

export interface AppState {
  reason: string;
  people: string[];
  assumptions: Assumption[];
  directOutcomes: DirectOutcome[];
  indirectOutcomes: ListItem[];
  ultimateImpact: ListItem[];
}

export interface UIState {
  expandedOutcomeId: string | null;
  editingId: string | null;
  editingType:
    | "assumption"
    | "directOutcome"
    | "directSubOutcome"
    | "indirect"
    | "ultimate"
    | null;
  showMoreDirect: boolean;
  showMoreIndirect: boolean;
  showMoreUltimate: boolean;
  parentId?: string;
}

export interface Programme {
  id: string;
  title: string;
  description: string;
}

export interface CardItem {
  id: string;
  text: string;
}

export interface FlowStep {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}
