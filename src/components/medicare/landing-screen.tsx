import type { ReactNode } from "react";
import { ArrowRight, ShieldCheck, Stethoscope, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicareLogo } from "./logo";

interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <MedicareLogo />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-3xl bg-card p-8 shadow-[var(--soft-shadow)] md:p-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Clinical decision support tool</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Predict 30-day hospital readmission risk
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              MediCare Readmission Risk Assistant guides you through a quick,
              conversational intake and estimates a patient's likelihood of
              returning to the hospital within 30 days.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <FeatureCard
                icon={<Stethoscope className="h-5 w-5" />}
                title="Guided intake"
                description="Chat-style questions, one at a time"
              />
              <FeatureCard
                icon={<ClipboardList className="h-5 w-5" />}
                title="Instant score"
                description="Risk probability with clear next steps"
              />
              <FeatureCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Explainable"
                description="Powered by SHAP-aware ML models"
              />
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={onStart}
                className="group rounded-full bg-gradient-to-r from-teal-500 to-blue-600 px-8 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Takes about 1 minute to complete.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary p-4">
      <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
