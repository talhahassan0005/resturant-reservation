"use client";

type Step = { label: string; step: number };

const STEPS: Step[] = [
  { step: 1, label: "Search" },
  { step: 2, label: "Restaurant" },
  { step: 3, label: "Your details" },
  { step: 4, label: "Payment" },
  { step: 5, label: "Confirmation" },
];

export default function StepBar({ current }: { current: number }) {
  return (
    <div className="rrs-steps">
      {STEPS.map((s, i) => {
        const isDone = s.step < current;
        const isActive = s.step === current;
        return (
          <div key={s.step} style={{ display: "flex", alignItems: "center" }}>
            <div className={`rrs-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
              <div className="rrs-step-dot">
                {isDone ? "✓" : s.step}
              </div>
              {s.label}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`rrs-step-line ${isDone ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
