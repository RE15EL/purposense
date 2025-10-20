import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}

export const PageTitle = ({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  containerClassName,
}: PageTitleProps) => {
  return (
    <div className={cn(containerClassName)}>
      <h1
        className={cn("text-3xl font-bold text-gray-900 mb-2", titleClassName)}
      >
        {title}
      </h1>
      <p className={cn("text-gray-600 mb-8", subtitleClassName)}>{subtitle}</p>
    </div>
  );
};
