import { z } from 'zod';

export const ProjectAnalysisSchema = z.object({
  complexity: z.number(),
  completeness: z.number(),
  innovation: z.number(),
});

export const TechnicalFeedbackSchema = z.object({
  codeReview: z.string(),
  bestPractices: z.string(),
  techStack: z.string().optional(),
});

export const PortfolioAnalysisResponseSchema = z.object({
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  technicalFeedback: TechnicalFeedbackSchema,
  overallScore: z.number(),
  nextSteps: z.array(z.string()),
  projectAnalysis: ProjectAnalysisSchema.optional(),
});

export type PortfolioAnalysisResponseZod = z.infer<typeof PortfolioAnalysisResponseSchema>;
