'use client';

import { PortfolioAnalysisResponse } from '@/types/portfolio';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
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
      {/* Header with Score & Summary */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" mb={1}>
              ✨ 분석 결과 요약
            </Typography>
            <Chip
              label={`종합 점수: ${result.overallScore}점`}
              color={getScoreColor(result.overallScore)}
              icon={<span>{getScoreEmoji(result.overallScore)}</span>}
              sx={{ fontSize: '1.1rem', px: 2, py: 1, mb: 2, mt: 1 }}
            />
            <Typography variant="body1" color="text.secondary" mb={2}>
              {result.summary}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Strengths, Weaknesses, Technical Feedback */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3} mb={4}>
        {/* 강점 */}
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
        {/* 약점 */}
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
        {/* 기술 피드백 */}
        <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: 'info.lighter', borderColor: 'info.light' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" color="info.main" mb={2}>
              🛠️ 기술 피드백
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <b>코드 리뷰:</b> {result.technicalFeedback.codeReview}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <b>모범 사례:</b> {result.technicalFeedback.bestPractices}
            </Typography>
            {result.technicalFeedback.techStack && (
              <Typography variant="body2" color="text.secondary">
                <b>기술 스택:</b> {result.technicalFeedback.techStack}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* 프로젝트별 분석 (optional) */}
      {result.projectAnalysis && (
        <Card variant="outlined" sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" color="primary" mb={2}>
              📊 프로젝트별 분석
            </Typography>
            <Box display="flex" justifyContent="center" gap={4}>
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">복잡도</Typography>
                <Chip label={result.projectAnalysis.complexity} color="primary" />
              </Box>
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">완성도</Typography>
                <Chip label={result.projectAnalysis.completeness} color="primary" />
              </Box>
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">혁신성</Typography>
                <Chip label={result.projectAnalysis.innovation} color="primary" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* 다음 단계 제안 */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" color="secondary" mb={2}>
            🚀 다음 단계 제안
          </Typography>
          <List>
            {result.nextSteps.map((step, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>➡️</ListItemIcon>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* New Analysis Button */}
      <Box textAlign="center" mt={2}>
        <Button variant="contained" color="primary" onClick={onNewAnalysis} size="large">
          새 분석 시작하기
        </Button>
      </Box>
    </Box>
  );
}
