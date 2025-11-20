/**
 * Code Viewer Component
 * Displays generated VBA code with syntax highlighting
 */

import React, { useMemo, useState } from 'react';
import { Box, Typography, Button, Paper, Divider, Snackbar, Alert } from '@mui/material';
import { useBlocks } from '../../hooks/useBlocks';
import { generateVBACode, exportToBasFile, copyToClipboard } from '../../services/codeGenerator';

const CodeViewer: React.FC = () => {
  const { blocks } = useBlocks();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Generate code from blocks (memoized for performance)
  const generatedCode = useMemo(() => {
    return generateVBACode(blocks);
  }, [blocks]);

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedCode);
    if (success) {
      setSnackbarMessage('코드가 클립보드에 복사되었습니다!');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('복사에 실패했습니다.');
      setSnackbarOpen(true);
    }
  };

  const handleDownload = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    exportToBasFile(generatedCode, `GeneratedMacro_${timestamp}`);
    setSnackbarMessage('파일이 다운로드되었습니다!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #ddd' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            📄 생성된 VBA 코드
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={handleCopy}
            sx={{ minWidth: '80px' }}
          >
            📋 복사
          </Button>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
          {blocks.length}개 블록 · {generatedCode.split('\n').length}줄
        </Typography>
      </Box>

      {/* Code Display Area */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: '#1e1e1e',
            color: '#d4d4d4',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.85rem',
            minHeight: '200px',
            whiteSpace: 'pre',
            overflowX: 'auto',
            lineHeight: 1.6
          }}
        >
          {generatedCode}
        </Paper>
      </Box>

      <Divider />

      {/* Download Button */}
      <Box sx={{ p: 2, bgcolor: 'white' }}>
        <Button 
          variant="contained" 
          fullWidth
          onClick={handleDownload}
          sx={{ bgcolor: '#1976d2' }}
        >
          💾 .bas 파일로 다운로드
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodeViewer;
