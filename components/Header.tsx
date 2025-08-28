'use client';

import { useState } from 'react';
import { useApiKey } from '@/contexts/ApiKeyContext';
import ApiKeyModal from './ApiKeyModal';

export default function Header() {
  const { isAuthenticated, clearApiKey } = useApiKey();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyClick = () => {
    if (isAuthenticated) {
      if (confirm('저장된 접근 키를 삭제하시겠습니까?')) {
        clearApiKey();
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">
                🔍 포트폴리오 AI 리뷰어
              </h1>
            </div>

            <button
              onClick={handleKeyClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${isAuthenticated
                  ? 'text-green-700 bg-green-50 border border-green-200 hover:bg-green-100'
                  : 'text-red-700 bg-red-50 border border-red-200 hover:bg-red-100'
                }`}
              title={isAuthenticated ? '접근 키가 설정됨 (클릭하여 삭제)' : '접근 키 설정 필요 (클릭하여 설정)'}
            >
              <span className="text-lg">
                {isAuthenticated ? '🔓' : '🔒'}
              </span>
              <span className="text-sm hidden sm:inline">
                {isAuthenticated ? '접근 키 설정됨' : '접근 키 설정'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
