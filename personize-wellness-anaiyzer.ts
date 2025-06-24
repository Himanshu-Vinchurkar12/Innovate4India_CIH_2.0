'use server';

/**
 * @fileOverview AI-powered personalized wellness tips flow.
 *
 * - generateWellnessTips - A function that generates personalized wellness tips.
 * - WellnessTipsInput - The input type for the generateWellnessTips function.
 * - WellnessTipsOutput - The return type for the generateWellnessTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellnessTipsInputSchema = z.object({
  healthConditions: z
    .string()
    .describe('The user health conditions, comma separated if multiple.'),
  uploadedMedicalData: z
    .string()
    .describe(
      'The user uploaded medical data, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type WellnessTipsInput = z.infer<typeof WellnessTipsInputSchema>;

const WellnessTipsOutputSchema = z.object({
  foodSuggestion: z.string().describe('A personalized food suggestion for the user.'),
  lifestyleSuggestion: z
    .string()
    .describe('A personalized lifestyle suggestion for the user.'),
});
export type WellnessTipsOutput = z.infer<typeof WellnessTipsOutputSchema>;

export async function generateWellnessTips(input: WellnessTipsInput): Promise<WellnessTipsOutput> {
  return personalizedWellnessTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedWellnessTipsPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: WellnessTipsInputSchema},
  output: {schema: WellnessTipsOutputSchema},
  prompt: `You are an AI wellness assistant. Generate personalized daily food and lifestyle suggestions for the user, taking into account their health conditions and uploaded medical data.

Health Conditions: {{{healthConditions}}}
Uploaded Medical Data: {{media url=uploadedMedicalData}}

Food Suggestion:`.trim(),
});

const personalizedWellnessTipsFlow = ai.defineFlow(
  {
    name: 'personalizedWellnessTipsFlow',
    inputSchema: WellnessTipsInputSchema,
    outputSchema: WellnessTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
