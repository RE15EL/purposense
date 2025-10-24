"use client";

interface FlowIconProps {
  icon: React.ReactNode;
  label?: string;
  showLabel?: boolean;
}

export const FlowIcon = ({ icon, label, showLabel = false }: FlowIconProps) => {
  return (
    <div className="flex flex-col items-center gap-2 group">
      {/* Icon circle */}
      <div
        className="
          w-16 h-16 rounded-full bg-white border-4 border-brand
          flex items-center justify-center
          text-brand
          shadow-lg
          transition-transform duration-200
          group-hover:scale-110
        "
      >
        {icon}
      </div>

      {/* Label */}
      {showLabel && (
        <span className="text-sm font-medium text-gray-900">{label}</span>
      )}
    </div>
  );
};
