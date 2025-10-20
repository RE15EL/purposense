import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Hint } from "../Hint/Hint";

import { AppState } from "@/types";

interface ReasonSectionProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const ReasonSection = ({ state, setState }: ReasonSectionProps) => (
  <Card className="gap-1.5">
    <CardHeader>
      <CardTitle>The reason we exist</CardTitle>
    </CardHeader>

    <CardContent>
      <div className="relative mb-1">
        <Textarea
          value={state.reason}
          onChange={(e) =>
            setState((s) => ({ ...s, reason: e.target.value.slice(0, 250) }))
          }
          placeholder="e.g. Strengthening local neighborhoods through the power of food"
          className="w-full p-4 px-2 border-2 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-purple-100 resize-y"
          rows={4}
        />
        
        {/* words counter */}
        <div className="absolute bottom-2 right-2.5 text-[8px] text-muted-foreground">
          {state.reason.length}/250
        </div>
      </div>

      <Hint caption="Main challenge your organization addresses (up to 250 words)" />
    </CardContent>
  </Card>
);
