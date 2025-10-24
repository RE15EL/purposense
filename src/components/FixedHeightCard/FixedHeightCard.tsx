import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  title: string;
  description?: string;
  zonePill: string;
  dashed?: boolean;
  children: ReactNode;
  className?: string;
}

export const FixedHeightCard = ({
  title,
  description,
  zonePill,
  children,
  className,
  dashed = false,
}: Props) => (
  <Card
    className={`h-[400px] pb-0 pt-4 gap-y-0 overflow-hidden ${
      dashed && "border-2 border-dashed border-brand"
    } ${className}`}
  >
    <CardHeader className="px-4 py-0 pt-2 gap-1">
      <CardTitle className="text-2xl font-bold text-brand">{title}</CardTitle>
      {description && (
        <CardDescription className="font-semibold text-sm text-gray-900">
          {description}
        </CardDescription>
      )}
    </CardHeader>

    <CardContent className="p-0 flex-1">{children}</CardContent>

    <CardFooter className="bg-brand min-h-12 w-full pb-0">
      <p className="text-base font-semibold text-white mx-auto">{zonePill}</p>
    </CardFooter>
  </Card>
);
