import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  title: string;
  zonePill: string;
  dashed?: boolean;
  children: ReactNode;
  className?: string;
}

export const FixedHeightCard = ({
  title,
  zonePill,
  children,
  className,
  dashed = false,
}: Props) => (
  <Card
    className={`pb-0 pt-4 gap-y-0 overflow-hidden ${
      dashed && "border-2 border-dashed border-brand"
    } ${className}`}
  >
    <CardHeader className="px-4 py-0">
      <CardTitle className="text-2xl font-bold text-brand">{title}</CardTitle>
    </CardHeader>

    <CardContent className="p-0">{children}</CardContent>

    <CardFooter className="bg-brand h-12 ">
      <p className="text-base font-semibold text-white mx-auto">{zonePill}</p>
    </CardFooter>
  </Card>
);
