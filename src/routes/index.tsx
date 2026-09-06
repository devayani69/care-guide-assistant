import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LandingScreen } from "@/components/medicare/landing-screen";
import { ChatFlow } from "@/components/medicare/chat-flow";
import { ResultScreen } from "@/components/medicare/result-screen";
import { MedicareFooter } from "@/components/medicare/footer";
import { calculateRisk } from "@/components/medicare/scoring";
import type { PatientData, RiskResult } from "@/components/medicare/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediCare Readmission Risk Assistant" },
      {
        name: "description",
        content:
          "Predict a patient's 30-day hospital readmission risk with a guided, conversational intake powered by machine learning.",
      },
      { property: "og:title", content: "MediCare Readmission Risk Assistant" },
      {
        property: "og:description",
        content:
          "Predict a patient's 30-day hospital readmission risk with a guided, conversational intake powered by machine learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type AppScreen = "landing" | "chat" | "result";

function Index() {
  const [screen, setScreen] = useState<AppScreen>("landing");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);

  const handleStart = () => setScreen("chat");

  const handleComplete = (data: PatientData) => {
    setPatientData(data);
    setRiskResult(calculateRisk(data));
    setScreen("result");
  };

  const handleRestart = () => {
    setPatientData(null);
    setRiskResult(null);
    setScreen("chat");
  };

  return (
    <div className="min-h-screen bg-background">
      {screen === "landing" && <LandingScreen onStart={handleStart} />}
      {screen === "chat" && <ChatFlow onComplete={handleComplete} />}
      {screen === "result" && patientData && riskResult && (
        <ResultScreen
          data={patientData}
          result={riskResult}
          onRestart={handleRestart}
        />
      )}
      {screen !== "chat" && <MedicareFooter />}
    </div>
  );
}
