// Portfolio analysis request/response types
export interface PortfolioAnalysisRequest {
  githubUrl: string;
  blogUrl?: string;
  resumeText?: string;
}

export interface ProjectAnalysis {
  complexity: number;
  completeness: number;
  innovation: number;
}

export interface TechnicalFeedback {
  codeReview: string;
  bestPractices: string;
  techStack?: string;
}

export interface PortfolioAnalysisResponse {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  technicalFeedback: TechnicalFeedback;
  overallScore: number;
  nextSteps: string[];
  projectAnalysis?: ProjectAnalysis;
}

export interface ApiError {
  message: string;
  status?: number;
}
