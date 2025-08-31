'use client';

import { useState } from 'react';
import { useApiKey } from '@/contexts/ApiKeyContext';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const { setApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

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
    <Dialog open={isOpen} onClose={handleCancel} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>서비스 접근 키 설정</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            서비스 이용을 위한 접근 키를 입력해주세요. 입력한 키는 브라우저에 안전하게 저장됩니다.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="API Key"
            type="text"
            fullWidth
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            error={!!error}
            helperText={error}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            취소
          </Button>
          <Button type="submit" variant="contained" color="primary">
            저장
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
