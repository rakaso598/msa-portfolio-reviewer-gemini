'use client';

import { useState } from 'react';
import { PortfolioAnalysisRequest } from '@/types/portfolio';
import { useApiKey } from '@/contexts/ApiKeyContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

interface PortfolioFormProps {
  onSubmit: (data: PortfolioAnalysisRequest) => void;
  isLoading: boolean;
}

export default function PortfolioForm({ onSubmit, isLoading }: PortfolioFormProps) {
  const { isAuthenticated } = useApiKey();
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
    if (!isAuthenticated) {
      alert('먼저 상단에서 접근 키를 설정해주세요.');
      return;
    }
    if (!validateForm()) {
      return;
    }
    // Remove empty optional fields
    const cleanData: PortfolioAnalysisRequest = {
      githubUrl: formData.githubUrl.trim(),
    };
    if (formData.blogUrl && formData.blogUrl.trim()) cleanData.blogUrl = formData.blogUrl.trim();
    if (formData.resumeText && formData.resumeText.trim()) cleanData.resumeText = formData.resumeText.trim();
    onSubmit(cleanData);
  };

  return (
    <Box maxWidth="500px" mx="auto" mt={6}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={1} textAlign="center">
            포트폴리오 분석 요청
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
            GitHub, 블로그, 이력서 정보를 입력하면 AI가 포트폴리오를 분석해드립니다.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                error={!!errors.githubUrl}
                helperText={errors.githubUrl}
                fullWidth
                required
              />
              <TextField
                label="블로그 URL (선택)"
                name="blogUrl"
                value={formData.blogUrl}
                onChange={e => setFormData({ ...formData, blogUrl: e.target.value })}
                fullWidth
              />
              <TextField
                label="이력서 내용 (선택)"
                name="resumeText"
                value={formData.resumeText}
                onChange={e => setFormData({ ...formData, resumeText: e.target.value })}
                fullWidth
                multiline
                minRows={4}
              />
              {!isAuthenticated && (
                <Alert severity="warning">
                  먼저 상단에서 접근 키를 설정해주세요.
                </Alert>
              )}
              <Box textAlign="center" mt={1}>
                <Button type="submit" variant="contained" color="primary" disabled={isLoading} size="large">
                  {isLoading ? '분석 중...' : '분석 요청'}
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
