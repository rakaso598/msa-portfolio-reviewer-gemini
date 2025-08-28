'use client';

import { useState } from 'react';
import { useApiKey } from '@/contexts/ApiKeyContext';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const { setApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputKey.trim()) {
      setError('API 키를 입력해주세요.');
      return;
    }

    if (inputKey.trim().length < 10) {
      setError('올바른 API 키를 입력해주세요.');
      return;
    }

    setApiKey(inputKey.trim());
    setInputKey('');
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setInputKey('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">서비스 접근 키 설정</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-sm mb-2">
            서비스 이용을 위한 접근 키를 입력해주세요. 입력한 키는
            브라우저에 안전하게 저장됩니다.
          </p>
          <p className="text-gray-600 text-xs">
            접근 키는 로컬 저장소에만 저장되며 서버로 전송되지 않습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700 mb-2">
              서비스 접근 키
            </label>
            <input
              type="password"
              id="apiKey"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="접근 키를 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
