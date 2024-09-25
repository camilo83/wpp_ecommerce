type SeparatorProps = {
  height: string | number;
};

export function Separator({ height }: SeparatorProps) {
  return <div style={{ height }} />;
}
