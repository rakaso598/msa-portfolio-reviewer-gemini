'use client';

import { PortfolioAnalysisResponse } from '@/types/portfolio';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

interface AnalysisResultProps {
  result: PortfolioAnalysisResponse;
  onNewAnalysis: () => void;
}

export default function AnalysisResult({ result, onNewAnalysis }: AnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🌟';
    if (score >= 70) return '👍';
    if (score >= 60) return '📈';
    return '💪';
  };

  return (
    <Box width="100%" maxWidth="900px" mx="auto" my={4}>
      {/* Header with Score */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" mb={2}>
              ✨ 분석 완료!
            </Typography>
            <Chip
              label={`종합 점수: ${result.overallScore}점`}
              color={getScoreColor(result.overallScore)}
              icon={<span>{getScoreEmoji(result.overallScore)}</span>}
              sx={{ fontSize: '1.1rem', px: 2, py: 1, mb: 2 }}
            />
            <Typography variant="body1" color="text.secondary" mb={2}>
              {result.summary}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      {/* Strengths and Weaknesses */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: 'success.lighter', borderColor: 'success.light' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" color="success.main" mb={2}>
                💪 강점
              </Typography>
              <List>
                {result.strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <span role="img" aria-label="check">✓</span>
                    </ListItemIcon>
                    <ListItemText primary={strength} primaryTypographyProps={{ color: 'success.dark', fontSize: '1rem' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: 'error.lighter', borderColor: 'error.light' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" color="error.main" mb={2}>
                ⚠️ 약점
              </Typography>
              <List>
                {result.weaknesses.map((weakness, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <span role="img" aria-label="cross">✗</span>
                    </ListItemIcon>
                    <ListItemText primary={weakness} primaryTypographyProps={{ color: 'error.dark', fontSize: '1rem' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* New Analysis Button */}
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={onNewAnalysis} size="large">
          새 분석 시작하기
        </Button>
      </Box>
    </Box>
  );
}
