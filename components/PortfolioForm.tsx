'use client';

import { useState } from 'react';
import { PortfolioAnalysisRequest } from '@/types/portfolio';
import { useApiKey } from '@/contexts/ApiKeyContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

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
    if (formData.blogUrl.trim()) cleanData.blogUrl = formData.blogUrl.trim();
    if (formData.resumeText.trim()) cleanData.resumeText = formData.resumeText.trim();
    onSubmit(cleanData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth="500px" mx="auto" mt={4}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        포트폴리오 분석 요청
      </Typography>
      <TextField
        label="GitHub URL"
        name="githubUrl"
        value={formData.githubUrl}
        onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
        error={!!errors.githubUrl}
        helperText={errors.githubUrl}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="블로그 URL (선택)"
        name="blogUrl"
        value={formData.blogUrl}
        onChange={e => setFormData({ ...formData, blogUrl: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="이력서 내용 (선택)"
        name="resumeText"
        value={formData.resumeText}
        onChange={e => setFormData({ ...formData, resumeText: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
      <Box mt={2} textAlign="right">
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? '분석 중...' : '분석 요청'}
        </Button>
      </Box>
      {!isAuthenticated && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          먼저 상단에서 접근 키를 설정해주세요.
        </Alert>
      )}
    </Box>
  );
}
