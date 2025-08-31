'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

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
    <Box maxWidth="600px" mx="auto">
      <Card variant="outlined" sx={{ borderColor: 'error.light', borderRadius: 3, mt: 4 }}>
        <CardContent>
          <Box textAlign="center">
            <Typography variant="h2" mb={2}>
              {getErrorIcon(error)}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="error.main" mb={2}>
              문제가 발생했습니다
            </Typography>
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            <Alert severity="info" sx={{ mb: 2 }}>💡 {getErrorAdvice(error)}</Alert>
            <Button variant="contained" color="primary" onClick={onRetry} sx={{ mt: 2 }}>
              다시 시도
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
