'use client';

import { useState } from 'react';
import { PortfolioAnalysisRequest, PortfolioAnalysisResponse } from '@/types/portfolio';
import { analyzePortfolio, PortfolioApiError } from '@/lib/api';
import PortfolioForm from '@/components/PortfolioForm';
import AnalysisResult from '@/components/AnalysisResult';
import ErrorDisplay from '@/components/ErrorDisplay';

type AppState = 'form' | 'loading' | 'result' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('form');
  const [result, setResult] = useState<PortfolioAnalysisResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: PortfolioAnalysisRequest) => {
    setIsLoading(true);
    setState('loading');
    setError('');

    try {
      const analysisResult = await analyzePortfolio(data);
      setResult(analysisResult);
      setState('result');
    } catch (err) {
      const errorMessage = err instanceof PortfolioApiError
        ? err.message
        : '알 수 없는 오류가 발생했습니다.';

      setError(errorMessage);
      setState('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setState('form');
    setResult(null);
    setError('');
  };

  const handleRetry = () => {
    setState('form');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {state === 'form' && (
          <PortfolioForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}

        {state === 'loading' && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  🤖 AI가 분석 중입니다
                </h2>

                <div className="space-y-3 text-gray-600">
                  <p className="text-lg">포트폴리오를 꼼꼼히 살펴보고 있어요</p>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>코드 품질, 문서화, 구조 등을 분석하는 중...</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">💡 잠깐!</span> 분석에는 보통 30초~1분 정도 소요됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {state === 'result' && result && (
          <AnalysisResult result={result} onNewAnalysis={handleNewAnalysis} />
        )}

        {state === 'error' && (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>🚀 MSA Portfolio Reviewer - AI 기반 포트폴리오 분석 서비스</p>
            <p className="mt-1">더 나은 개발자로 성장하는 여정을 함께합니다</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
