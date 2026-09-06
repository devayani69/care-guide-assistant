export interface PatientData {
  name: string;
  age: number;
  daysAdmitted: number;
  labProcedures: number;
  medications: number;
  priorInpatientVisits: number;
  priorEmergencyVisits: number;
  numDiagnoses: number;
}

export interface QuestionConfig {
  id: keyof PatientData;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export type RiskLevel = "low" | "medium" | "high";

export interface RiskResult {
  score: number;
  level: RiskLevel;
  recommendation: string;
}

export const QUESTIONS: QuestionConfig[] = [
  {
    id: "name",
    label: "What's the patient's name?",
    min: 0,
    max: 0,
    step: 1,
    defaultValue: 0,
    unit: "",
  },
  {
    id: "age",
    label: "How old is the patient?",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 45,
    unit: "years",
  },
  {
    id: "daysAdmitted",
    label: "How many days has the patient been admitted?",
    min: 1,
    max: 14,
    step: 1,
    defaultValue: 2,
    unit: "days",
  },
  {
    id: "labProcedures",
    label: "How many lab procedures were performed?",
    min: 0,
    max: 120,
    step: 1,
    defaultValue: 10,
    unit: "procedures",
  },
  {
    id: "medications",
    label: "How many medications is the patient currently taking?",
    min: 1,
    max: 40,
    step: 1,
    defaultValue: 5,
    unit: "medications",
  },
  {
    id: "priorInpatientVisits",
    label: "How many prior inpatient visits in the past year?",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 0,
    unit: "visits",
  },
  {
    id: "priorEmergencyVisits",
    label: "How many prior emergency room visits in the past year?",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 0,
    unit: "visits",
  },
  {
    id: "numDiagnoses",
    label: "How many diagnosed medical conditions does the patient have?",
    min: 1,
    max: 16,
    step: 1,
    defaultValue: 2,
    unit: "conditions",
  },
];
