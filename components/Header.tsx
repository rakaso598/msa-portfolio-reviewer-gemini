'use client';

import { useState } from 'react';
import { useApiKey } from '@/contexts/ApiKeyContext';
import ApiKeyModal from './ApiKeyModal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
      <AppBar position="sticky" color="default" elevation={1} sx={{ zIndex: 1200 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" fontWeight="bold">
            🔍 포트폴리오 AI 리뷰어
          </Typography>
          <Button
            onClick={handleKeyClick}
            variant={isAuthenticated ? 'outlined' : 'contained'}
            color={isAuthenticated ? 'success' : 'error'}
            startIcon={<span>{isAuthenticated ? '🔓' : '🔒'}</span>}
            sx={{ borderRadius: 3, fontWeight: 500 }}
            title={isAuthenticated ? '접근 키가 설정됨 (클릭하여 삭제)' : '접근 키 설정 필요 (클릭하여 설정)'}
          >
            {isAuthenticated ? '접근 키 설정됨' : '접근 키 설정'}
          </Button>
        </Toolbar>
      </AppBar>
      <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
