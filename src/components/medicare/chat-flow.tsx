import { useState, useRef, useEffect } from "react";
import { User, Bot, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { MedicareLogo } from "./logo";
import { QUESTIONS, type PatientData } from "./types";

interface ChatFlowProps {
  onComplete: (data: PatientData) => void;
}

const INITIAL_DATA: PatientData = {
  name: "",
  age: 45,
  daysAdmitted: 2,
  labProcedures: 10,
  medications: 5,
  priorInpatientVisits: 0,
  priorEmergencyVisits: 0,
  numDiagnoses: 2,
};

export function ChatFlow({ onComplete }: ChatFlowProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<PatientData>(INITIAL_DATA);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUESTIONS[step];
  const progress = Math.round(((step + 1) / QUESTIONS.length) * 100);

  useEffect(() => {
    if (currentQuestion.id !== "name") {
      setInputValue(String(data[currentQuestion.id]));
    } else {
      setInputValue(data.name);
    }
  }, [step, currentQuestion.id, data]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, step]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    let nextData = data;

    if (currentQuestion.id === "name") {
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      nextData = { ...data, name: trimmed };
      setData(nextData);
      setHistory((prev) => [...prev, { question: currentQuestion.label, answer: trimmed }]);
    } else {
      const numericValue = Number(inputValue);
      if (Number.isNaN(numericValue)) return;
      const clamped = Math.max(currentQuestion.min, Math.min(currentQuestion.max, numericValue));
      nextData = { ...data, [currentQuestion.id]: clamped } as PatientData;
      setData(nextData);
      setHistory((prev) => [
        ...prev,
        {
          question: currentQuestion.label,
          answer: `${clamped} ${currentQuestion.unit}`,
        },
      ]);
    }

    if (step < QUESTIONS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onComplete(nextData);
    }
  };

  const isNameStep = currentQuestion.id === "name";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 w-full border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <MedicareLogo />
          <div className="text-right">
            <p className="text-xs font-medium text-muted-foreground">
              Step {step + 1} of {QUESTIONS.length}
            </p>
            <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 py-6">
        <div
          ref={scrollRef}
          className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto pb-4"
        >
          <AssistantMessage>
            Hi there. I'm your readmission risk assistant. Let's check your readmission risk
            together — I'll ask a few quick questions.
          </AssistantMessage>

          {history.map((entry, index) => (
            <div key={index} className="flex flex-col gap-2">
              <AssistantMessage>{entry.question}</AssistantMessage>
              <UserMessage>{entry.answer}</UserMessage>
            </div>
          ))}

          <AssistantMessage>{currentQuestion.label}</AssistantMessage>

          <form
            onSubmit={handleSubmit}
            className="mt-2 rounded-2xl bg-card p-4 shadow-[var(--soft-shadow)]"
          >
            {isNameStep ? (
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder="e.g. Jane Smith"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  className="h-12 rounded-xl border-input bg-background text-base"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 font-semibold text-white"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentQuestion.min} {currentQuestion.unit}
                  </span>
                  <span className="rounded-lg bg-primary/10 px-3 py-1 text-lg font-bold text-primary">
                    {inputValue}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentQuestion.max} {currentQuestion.unit}
                  </span>
                </div>
                <Slider
                  value={[Number(inputValue) || currentQuestion.min]}
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  step={currentQuestion.step}
                  onValueChange={(value) => setInputValue(String(value[0]))}
                />
                <Button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 font-semibold text-white"
                >
                  {step === QUESTIONS.length - 1 ? "See Result" : "Next"}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Bot className="h-4 w-4" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-card px-5 py-3 text-foreground shadow-sm">
        {children}
      </div>
    </div>
  );
}

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-end gap-3">
      <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-gradient-to-r from-teal-500 to-blue-600 px-5 py-3 text-white shadow-sm">
        {children}
      </div>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <User className="h-4 w-4" />
      </div>
    </div>
  );
}
