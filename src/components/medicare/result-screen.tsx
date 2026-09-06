import { ArrowLeft, CheckCircle, AlertCircle, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MedicareLogo } from "./logo";
import type { PatientData, RiskResult } from "./types";

interface ResultScreenProps {
  data: PatientData;
  result: RiskResult;
  onRestart: () => void;
}

export function ResultScreen({ data, result, onRestart }: ResultScreenProps) {
  const { level, score, recommendation } = result;

  const config = {
    low: {
      icon: <CheckCircle className="h-6 w-6" />,
      label: "Low Risk",
      badgeClass: "bg-risk-low-bg text-risk-low border-risk-low/20",
      barClass: "bg-risk-low",
      message: "Continue standard discharge planning.",
    },
    medium: {
      icon: <AlertCircle className="h-6 w-6" />,
      label: "Medium Risk",
      badgeClass: "bg-risk-medium-bg text-risk-medium border-risk-medium/20",
      barClass: "bg-risk-medium",
      message: "Consider enhanced follow-up care.",
    },
    high: {
      icon: <AlertTriangle className="h-6 w-6" />,
      label: "High Risk",
      badgeClass: "bg-risk-high-bg text-risk-high border-risk-high/20",
      barClass: "bg-risk-high",
      message: "Prioritize intervention and close monitoring.",
    },
  }[level];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <MedicareLogo />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-3xl bg-card p-8 shadow-[var(--soft-shadow)] md:p-12">
            <div className="text-center">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${config.badgeClass}`}
              >
                {config.icon}
                {config.label}
              </div>

              <h1 className="mt-6 text-3xl font-bold text-foreground md:text-4xl">
                {score}% readmission risk
              </h1>
              <p className="mt-2 text-muted-foreground">
                Estimated 30-day hospital readmission probability for{" "}
                <span className="font-semibold text-foreground">{data.name}</span>
              </p>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm font-medium">
                <span className="text-risk-low">Low</span>
                <span className="text-risk-medium">Medium</span>
                <span className="text-risk-high">High</span>
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${config.barClass}`}
                  style={{ width: `${score}%` }}
                />
                <div className="absolute left-[15%] top-0 h-full w-0.5 bg-foreground/10" />
                <div className="absolute left-[30%] top-0 h-full w-0.5 bg-foreground/10" />
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Risk thresholds: Low &lt;15%, Medium 15–30%, High &gt;30%
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-secondary p-6">
              <h2 className="text-lg font-semibold text-foreground">Recommendation</h2>
              <p className="mt-2 text-muted-foreground">{recommendation}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-center text-sm sm:grid-cols-4">
              <SummaryItem label="Age" value={`${data.age}`} />
              <SummaryItem label="Admitted" value={`${data.daysAdmitted}d`} />
              <SummaryItem label="Meds" value={`${data.medications}`} />
              <SummaryItem label="Prior visits" value={`${data.priorInpatientVisits}`} />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={onRestart}
                className="rounded-full bg-gradient-to-r from-teal-500 to-blue-600 px-8 font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Check Another Patient
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}
