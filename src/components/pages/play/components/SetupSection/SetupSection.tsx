import AdjustCounter from "./AdjustCounter";

type SetupSectionProps = {
  title: string;
  initialValue: number;
  step: number;
  unit?: string;
  min: number;
  onChange?: (value: number) => void;
};

export default function SetupSection({
  title,
  initialValue,
  step,
  unit,
  min,
  onChange,
}: SetupSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h3 className="text-xl font-light">{title}</h3>
      <AdjustCounter
        initialValue={initialValue}
        step={step}
        unit={unit}
        min={min}
        onChange={onChange}
      />
    </div>
  );
}
