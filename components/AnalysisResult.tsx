'use client';

import { PortfolioAnalysisResponse } from '@/types/portfolio';

interface AnalysisResultProps {
  result: PortfolioAnalysisResponse;
  onNewAnalysis: () => void;
}

export default function AnalysisResult({ result, onNewAnalysis }: AnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🌟';
    if (score >= 70) return '👍';
    if (score >= 60) return '📈';
    return '💪';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with Score */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ✨ 분석 완료!
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-lg ${getScoreColor(result.overallScore)}`}>
              <span className="text-2xl mr-2">{getScoreEmoji(result.overallScore)}</span>
              종합 점수: {result.overallScore}점
            </div>
          </div>
          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            {result.summary}
          </p>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
            <span className="text-xl mr-2">💪</span>
            강점
          </h3>
          <ul className="space-y-3">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-green-700 text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
          <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
            <span className="text-xl mr-2">🎯</span>
            개선점
          </h3>
          <ul className="space-y-3">
            {result.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-orange-600 mt-1">!</span>
                <span className="text-orange-700 text-sm">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technical Feedback */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">⚡</span>
          기술적 피드백
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Review */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <span className="text-lg mr-2">🔍</span>
              코드 리뷰
            </h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {result.technicalFeedback.codeReview}
              </p>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <span className="text-lg mr-2">⭐</span>
              베스트 프랙티스
            </h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {result.technicalFeedback.bestPractices}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Feedback */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">📚</span>
          문서화 피드백
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* README Review */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <span className="text-lg mr-2">📄</span>
              README 리뷰
            </h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {result.documentationFeedback.readmeReview}
              </p>
            </div>
          </div>

          {/* Blog Review */}
          {result.documentationFeedback.blogReview && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <span className="text-lg mr-2">✍️</span>
                블로그 리뷰
              </h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {result.documentationFeedback.blogReview}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 md:p-8">
        <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
          <span className="text-2xl mr-2">🚀</span>
          다음 단계
        </h3>
        <ul className="space-y-3">
          {result.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                {index + 1}
              </span>
              <span className="text-blue-700 text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onNewAnalysis}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          새로운 분석 시작하기
        </button>
      </div>
    </div>
  );
}
