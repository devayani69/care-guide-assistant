import { Brain, Database } from "lucide-react";

export function MedicareFooter() {
  return (
    <footer className="w-full border-t border-border bg-card py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-2xl bg-secondary p-6 md:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Brain className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-foreground">About this project</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The MediCare Readmission Risk Assistant is a clinical decision support demo powered by a
            Random Forest machine learning model trained on 100,000+ real hospital records. It uses
            SHAP explainability to highlight which patient factors contribute most to the predicted
            30-day readmission probability.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              <span>Trained on 100,000+ hospital records</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5" />
              <span>SHAP explainability built-in</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            This is a frontend demonstration. The scoring function shown here is a placeholder and
            should be replaced with your trained Python ML model API for production use.
          </p>
        </div>
      </div>
    </footer>
  );
}
