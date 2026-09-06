import type { PatientData, RiskLevel, RiskResult } from "./types";

/**
 * Placeholder scoring function for the 30-day readmission risk.
 *
 * Weights prior inpatient visits and medication count most heavily,
 * then blends in emergency visits, diagnoses, age, length of stay,
 * and lab procedures. Returns a 0-100% score and a risk bucket.
 *
 * TODO: Replace this with a real API call to the trained Python ML model.
 */
export function calculateRisk(data: PatientData): RiskResult {
  const weightedSum =
    data.priorInpatientVisits * 7 +
    data.medications * 2.5 +
    data.priorEmergencyVisits * 2 +
    data.numDiagnoses * 1.5 +
    data.age * 0.15 +
    data.daysAdmitted * 0.8 +
    data.labProcedures * 0.08;

  const maxPossible =
    10 * 7 +
    40 * 2.5 +
    10 * 2 +
    16 * 1.5 +
    100 * 0.15 +
    14 * 0.8 +
    120 * 0.08;

  const score = Math.min(100, Math.max(0, (weightedSum / maxPossible) * 100));

  let level: RiskLevel;
  let recommendation: string;

  if (score < 15) {
    level = "low";
    recommendation =
      "Risk is low. Schedule routine follow-up care and send standard discharge instructions.";
  } else if (score <= 30) {
    level = "medium";
    recommendation =
      "Moderate risk detected. Schedule a follow-up appointment within 1–2 weeks and review medications.";
  } else {
    level = "high";
    recommendation =
      "High readmission risk. Arrange a follow-up within 2–3 days, coordinate home care, and confirm medication adherence.";
  }

  return {
    score: Math.round(score * 10) / 10,
    level,
    recommendation,
  };
}
