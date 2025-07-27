'use server';

/**
 * @fileOverview A financial insights AI agent that provides personalized financial advice in the user's local language.
 *
 * - financialInsightsChat - A function that handles the financial insights chat process.
 * - FinancialInsightsChatInput - The input type for the financialInsightsChat function.
 * - FinancialInsightsChatOutput - The return type for the financialInsightsChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialInsightsChatInputSchema = z.object({
  language: z.string().describe('The user selected locale for localized financial terminology.'),
  query: z.string().describe('The user query for financial insights.'),
});
export type FinancialInsightsChatInput = z.infer<typeof FinancialInsightsChatInputSchema>;

const FinancialInsightsChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated financial insights response in the user selected language.'),
});
export type FinancialInsightsChatOutput = z.infer<typeof FinancialInsightsChatOutputSchema>;

export async function financialInsightsChat(input: FinancialInsightsChatInput): Promise<FinancialInsightsChatOutput> {
  return financialInsightsChatFlow(input);
}

const getLocalizedFinancialTerminology = ai.defineTool({
  name: 'getLocalizedFinancialTerminology',
  description: 'Retrieves localized financial terminology based on the user selected language.',
  inputSchema: z.object({
    language: z.string().describe('The user selected locale for financial terminology.'),
  }),
  outputSchema: z.string(),
},
async (input) => {
  // TODO: Implement the logic to fetch localized financial terminology based on the language.
  // This is a placeholder implementation.
  const localizedTerminology = `Localized financial terminology for ${input.language} is not yet available. Returning english terminology.`;
  return localizedTerminology;
}
);

const financialInsightsChatPrompt = ai.definePrompt({
  name: 'financialInsightsChatPrompt',
  tools: [getLocalizedFinancialTerminology],
  input: {schema: FinancialInsightsChatInputSchema},
  output: {schema: FinancialInsightsChatOutputSchema},
  prompt: `You are a smart finance assistant that provides personalized financial insights and advice to users in their local language.

  First, call the getLocalizedFinancialTerminology tool to translate all financial terms in the selected language: {{{language}}}.

  Then, respond to the user query: {{{query}}} using the localized financial terminology.

  Output should be concise, easy to understand, and relevant to the user's query.
  `,
});

const financialInsightsChatFlow = ai.defineFlow(
  {
    name: 'financialInsightsChatFlow',
    inputSchema: FinancialInsightsChatInputSchema,
    outputSchema: FinancialInsightsChatOutputSchema,
  },
  async input => {
    const {output} = await financialInsightsChatPrompt(input);
    return output!;
  }
);
