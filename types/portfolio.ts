// Portfolio analysis request/response types
export interface PortfolioAnalysisRequest {
  githubUrl: string;
  blogUrl?: string;
  resumeText?: string;
}

export interface PortfolioAnalysisResponse {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  technicalFeedback: {
    codeReview: string;
    bestPractices: string;
  };
  documentationFeedback: {
    readmeReview: string;
    blogReview?: string;
  };
  overallScore: number;
  nextSteps: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}
