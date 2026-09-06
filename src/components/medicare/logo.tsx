import { HeartPulse } from "lucide-react";

export function MedicareLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-md">
        <HeartPulse className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-foreground">MediCare</span>
        <span className="text-xs font-medium leading-tight text-muted-foreground">
          Readmission Risk
        </span>
      </div>
    </div>
  );
}
