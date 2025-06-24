
'use server';

/**
 * @fileOverview A rule-based tool for analyzing user-reported symptoms and providing wellness advice.
 *
 * - wellnessAnalyzer - A Genkit tool that provides suggestions based on keyword matching.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Define some predefined suggestions
const wellnessTips = {
  breathingExercise: 'Try a 4-7-8 breathing exercise: inhale for 4s, hold for 7s, exhale for 8s.',
  mindfulness: 'Focus on your senses. Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.',
  grounding: 'Try a grounding technique, like holding a cold object or pressing your feet firmly into the floor.',
};

const lifestyleSuggestions = {
  sleep: 'Aim for 7-9 hours of consistent sleep each night.',
  hydration: 'Ensure you are drinking enough water throughout the day.',
  activity: 'Even a short 10-minute walk can boost your mood.',
  connect: 'Reach out to a friend or family member to talk about how you are feeling.',
};

const WellnessAnalysisSchema = z.object({
  conditionTags: z.array(z.string()).describe('Suggested mental condition tags, e.g., "Anxiety", "Stress"'),
  suggestedTips: z.array(z.string()).describe('A list of relevant mental wellness tips.'),
  suggestedLifestyle: z.array(z.string()).describe('A list of relevant lifestyle suggestions.'),
  professionalHelpRecommended: z.boolean().describe('Whether professional help is strongly recommended.'),
});

export const wellnessAnalyzer = ai.defineTool(
  {
    name: 'wellnessAnalyzer',
    description: 'Analyzes user-reported symptoms and feelings to provide wellness tips, lifestyle suggestions, and assess if professional help is needed.',
    inputSchema: z.object({
      userInput: z.string().describe("The user's message describing their symptoms or feelings."),
    }),
    outputSchema: WellnessAnalysisSchema,
  },
  async (input) => {
    const userInput = input.userInput.toLowerCase();
    const analysis: z.infer<typeof WellnessAnalysisSchema> = {
      conditionTags: [],
      suggestedTips: [],
      suggestedLifestyle: [],
      professionalHelpRecommended: false,
    };

    // Rule for Anxiety/Panic
    if (/\b(anxious|anxiety|panic|overwhelmed|chest tight|can't breathe)\b/.test(userInput)) {
      analysis.conditionTags.push('Anxiety');
      analysis.suggestedTips.push(wellnessTips.breathingExercise, wellnessTips.grounding);
      analysis.professionalHelpRecommended = /\b(panic|can't breathe|hopeless)\b/.test(userInput);
    }
    
    // Rule for Stress
    if (/\b(stress|stressed|burnt out)\b/.test(userInput)) {
        analysis.conditionTags.push('Stress');
        analysis.suggestedTips.push(wellnessTips.mindfulness);
        analysis.suggestedLifestyle.push(lifestyleSuggestions.activity);
    }

    // Rule for Sadness/Depression
    if (/\b(sad|lonely|empty|hopeless|no motivation)\b/.test(userInput)) {
      analysis.conditionTags.push('Low Mood');
      analysis.suggestedLifestyle.push(lifestyleSuggestions.connect, lifestyleSuggestions.activity);
      analysis.professionalHelpRecommended = /\b(hopeless)\b/.test(userInput);
    }
    
    // Rule for Physical Symptoms
    if (/\b(headache|fatigue|tired)\b/.test(userInput)) {
        analysis.suggestedLifestyle.push(lifestyleSuggestions.hydration, lifestyleSuggestions.sleep);
    }
    
    // Generic fallback if no rules match
    if (analysis.conditionTags.length === 0 && analysis.suggestedTips.length === 0 && analysis.suggestedLifestyle.length === 0) {
        analysis.suggestedTips.push("It can be helpful to talk about what's on your mind.");
    }
    
    // Deduplicate arrays
    analysis.conditionTags = [...new Set(analysis.conditionTags)];
    analysis.suggestedTips = [...new Set(analysis.suggestedTips)];
    analysis.suggestedLifestyle = [...new Set(analysis.suggestedLifestyle)];

    return analysis;
  }
);
