'use client';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  const getErrorIcon = (error: string) => {
    if (error.includes('네트워크')) return '🌐';
    if (error.includes('인증')) return '🔑';
    if (error.includes('요청이 너무 많습니다')) return '⏰';
    if (error.includes('서버')) return '⚠️';
    return '❌';
  };

  const getErrorAdvice = (error: string) => {
    if (error.includes('네트워크')) {
      return '인터넷 연결을 확인하고 다시 시도해보세요.';
    }
    if (error.includes('GitHub URL')) {
      return 'GitHub 저장소 URL을 다시 확인해주세요. 공개 저장소여야 합니다.';
    }
    if (error.includes('요청이 너무 많습니다')) {
      return '잠시 후 다시 시도해주세요. (1분에 2회 제한)';
    }
    if (error.includes('서버')) {
      return '서버에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.';
    }
    return '문제가 지속되면 잠시 후 다시 시도해주세요.';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6 md:p-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="text-6xl mb-4">
            {getErrorIcon(error)}
          </div>

          {/* Error Title */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            문제가 발생했습니다
          </h2>

          {/* Error Message */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm md:text-base font-medium">
              {error}
            </p>
          </div>

          {/* Error Advice */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-gray-800 text-sm md:text-base">
              💡 {getErrorAdvice(error)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              다시 시도하기
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              페이지 새로고침
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">자주 발생하는 문제들</h3>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• GitHub URL이 올바른 형식이 아닌 경우</li>
              <li>• 비공개 저장소를 입력한 경우</li>
              <li>• 네트워크 연결이 불안정한 경우</li>
              <li>• 서버가 일시적으로 과부하 상태인 경우</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
