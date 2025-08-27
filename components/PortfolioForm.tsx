'use client';

import { useState } from 'react';
import { PortfolioAnalysisRequest } from '@/types/portfolio';

interface PortfolioFormProps {
  onSubmit: (data: PortfolioAnalysisRequest) => void;
  isLoading: boolean;
}

export default function PortfolioForm({ onSubmit, isLoading }: PortfolioFormProps) {
  const [formData, setFormData] = useState<PortfolioAnalysisRequest>({
    githubUrl: '',
    blogUrl: '',
    resumeText: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = 'GitHub URL은 필수입니다.';
    } else if (!isValidGithubUrl(formData.githubUrl)) {
      newErrors.githubUrl = '올바른 GitHub URL을 입력해주세요. (예: https://github.com/username/repository)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidGithubUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return parsed.hostname === 'github.com' && parsed.pathname.split('/').length >= 3;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Remove empty optional fields
    const cleanData: PortfolioAnalysisRequest = {
      githubUrl: formData.githubUrl.trim(),
    };

    if (formData.blogUrl?.trim()) {
      cleanData.blogUrl = formData.blogUrl.trim();
    }

    if (formData.resumeText?.trim()) {
      cleanData.resumeText = formData.resumeText.trim();
    }

    onSubmit(cleanData);
  };

  const handleInputChange = (field: keyof PortfolioAnalysisRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            🔍 포트폴리오 AI 리뷰어
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            GitHub 프로젝트를 분석하고 전문적인 피드백을 받아보세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GitHub URL - Required */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-700 mb-2">
              GitHub 저장소 URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="githubUrl"
              value={formData.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              placeholder="https://github.com/username/repository"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.githubUrl
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {errors.githubUrl && (
              <p className="mt-2 text-sm text-red-600">{errors.githubUrl}</p>
            )}
          </div>

          {/* Blog URL - Optional */}
          <div>
            <label htmlFor="blogUrl" className="block text-sm font-semibold text-gray-700 mb-2">
              블로그 게시물 URL <span className="text-gray-400 text-xs">(선택사항)</span>
            </label>
            <input
              type="url"
              id="blogUrl"
              value={formData.blogUrl}
              onChange={(e) => handleInputChange('blogUrl', e.target.value)}
              placeholder="https://your-blog.com/post"
              disabled={isLoading}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'
                }`}
            />
          </div>

          {/* Resume Text - Optional */}
          <div>
            <label htmlFor="resumeText" className="block text-sm font-semibold text-gray-700 mb-2">
              이력서 내용 <span className="text-gray-400 text-xs">(선택사항)</span>
            </label>
            <textarea
              id="resumeText"
              value={formData.resumeText}
              onChange={(e) => handleInputChange('resumeText', e.target.value)}
              placeholder="간단한 자기소개나 경력사항을 입력해주세요..."
              rows={4}
              disabled={isLoading}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${isLoading ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'
                }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.githubUrl.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>분석 중...</span>
              </div>
            ) : (
              '포트폴리오 분석 시작'
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 팁:</span> 공개 저장소만 분석 가능하며, README.md 파일이 있으면 더 정확한 분석이 가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
