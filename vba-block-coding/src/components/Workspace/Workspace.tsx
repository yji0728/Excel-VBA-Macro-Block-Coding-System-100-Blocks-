/**
 * Workspace Component
 * Main working area where users assemble blocks
 */

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Workspace: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        작업 공간
      </Typography>

      {/* Empty Workspace Message */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ddd',
          borderRadius: 2,
          bgcolor: 'white',
          p: 4
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            color: 'text.secondary'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#999' }}>
            📦 → 🎯
          </Typography>
          <Typography variant="body1" gutterBottom>
            여기에 블록을 드래그하세요
          </Typography>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            왼쪽 블록 라이브러리에서 블록을 선택하여
            <br />
            이 영역으로 드래그 앤 드롭하세요
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Workspace;
