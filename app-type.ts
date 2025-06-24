
export interface User {
  id?: string;
  name: string;
  age: number;
  email: string;
  password?: string; // Should not be stored long-term or passed around after auth
  healthData?: {
    bloodPressure?: string;
    bloodSugar?: string;
    allergies?: string;
    conditions?: string;
    medicalFile?: File | null;
    medicalFileName?: string;
  };
  isLoggedIn?: boolean;
}

export interface HealthVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  conditions: string[]; // e.g., ["Diabetes", "Hypertension"]
  dataAiHint?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  distance: string;
  rating: number;
  imageUrl: string;
  dataAiHint?: string;
  bio?: string;
  phone?: string;
  officeHours?: string[];
}

export interface WearableData {
  heartRate: number | null;
  steps: number | null;
  sleepHours: number | null;
  spO2: number | null;
}

export interface WellnessTip {
  foodSuggestion: string;
  lifestyleSuggestion: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
}
