import { PortfolioAnalysisRequest, PortfolioAnalysisResponse, ApiError } from '@/types/portfolio';
import { PortfolioAnalysisResponseSchema } from '@/types/portfolio.zod';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class PortfolioApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'PortfolioApiError';
  }
}

export async function analyzePortfolio(data: PortfolioAnalysisRequest, apiKey: string): Promise<PortfolioAnalysisResponse> {
  if (!API_BASE_URL) {
    throw new PortfolioApiError('API_BASE_URL 환경 변수가 설정되지 않았습니다.');
  }

  if (!apiKey) {
    throw new PortfolioApiError('API 키가 설정되지 않았습니다. 헤더에서 접근 키를 설정해주세요.');
  }

  // URL validation
  if (!data.githubUrl || !isValidGithubUrl(data.githubUrl)) {
    throw new PortfolioApiError('유효한 GitHub URL을 입력해주세요.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/gemini/analyze_portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = `API 요청 실패 (${response.status})`;

      switch (response.status) {
        case 400:
          errorMessage = '요청 데이터가 올바르지 않습니다. 입력 정보를 확인해주세요.';
          break;
        case 401:
          errorMessage = 'API 인증에 실패했습니다.';
          break;
        case 429:
          errorMessage = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
          break;
        case 500:
          errorMessage = '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          break;
      }

      throw new PortfolioApiError(errorMessage, response.status);
    }

    const result = await response.json();
    // Zod로 응답 검증
    const parsed = PortfolioAnalysisResponseSchema.safeParse(result);
    if (!parsed.success) {
      throw new PortfolioApiError('API 응답 형식이 올바르지 않습니다.');
    }
    return parsed.data;
  } catch (error) {
    if (error instanceof PortfolioApiError) {
      throw error;
    }

    // Network or other fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new PortfolioApiError('네트워크 연결을 확인해주세요.');
    }

    throw new PortfolioApiError('알 수 없는 오류가 발생했습니다.');
  }
}

function isValidGithubUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'github.com' && parsed.pathname.split('/').length >= 3;
  } catch {
    return false;
  }
}

export { PortfolioApiError };
