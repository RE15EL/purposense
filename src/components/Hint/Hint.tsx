interface HintProps {
  caption: string;
}

export const Hint = ({ caption }: HintProps) => {
  return <p className="text-xs text-muted-foreground">{caption}</p>;
};
