"use client";

import Link from "next/link";
import { FixedHeightCard } from "../FixedHeightCard/FixedHeightCard";
import { ProgrammesIcon } from "../Icons/Icons";

export const ProgrammesCard = () => (
  <div>
    <div className="flex justify-center items-center lg:hidden w-full scale-60">
      <ProgrammesIcon />
    </div>

    <FixedHeightCard
      title="Programmes"
      description="Sets of activities we deliver"
      zonePill="Zone of control"
    >
      <div className="h-64 overflow-auto scrollbar-hide p-4 space-y-1">
        <div className="border-gray-200">
          <p className="text-xs text-gray-600">
            Programmes displayed here are synced with your main Programmes list.
          </p>

          <p className="text-xs text-gray-600">
            To add or make changes, please visit the{" "}
            <Link href="" className="text-brand font-semibold">
              Programmes
            </Link>{" "}
            section.
          </p>
        </div>
      </div>
    </FixedHeightCard>
  </div>
);
