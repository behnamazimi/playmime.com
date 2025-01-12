"use client";

import Button from "@/components/common/Button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
type AdjustCounterProps = {
  initialValue: number;
  step: number;
  unit?: string;
  min: number;
  onChange?: (value: number) => void;
};

export default function AdjustCounter({
  initialValue,
  step,
  unit,
  min = 0,
  onChange,
}: AdjustCounterProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  const increase = () => {
    setValue((prev) => prev + step);
  };
  const decrease = () => {
    setValue((prev) => Math.max(min, prev - step)); // Prevent negative values
  };

  return (
    <div className="flex gap-8 items-center rtl:flex-row-reverse">
      <Button
        onClick={decrease}
        icon={<MinusIcon />}
        size={"large"}
        vibrateOnTap
      />
      <span className="text-2xl font-bold">
        {value} {unit}
      </span>
      <Button
        onClick={increase}
        icon={<PlusIcon />}
        size={"large"}
        vibrateOnTap
      />
    </div>
  );
}
