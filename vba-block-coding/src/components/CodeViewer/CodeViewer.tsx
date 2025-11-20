/**
 * Code Viewer Component
 * Displays generated VBA code with syntax highlighting
 */

import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';

const CodeViewer: React.FC = () => {
  const sampleCode = `Sub GeneratedMacro()
    ' 블록이 추가되면 여기에 VBA 코드가 생성됩니다
    
End Sub`;

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
            sx={{ minWidth: '80px' }}
          >
            📋 복사
          </Button>
        </Box>
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
            fontSize: '0.9rem',
            minHeight: '200px',
            whiteSpace: 'pre',
            overflowX: 'auto'
          }}
        >
          {sampleCode}
        </Paper>
      </Box>

      <Divider />

      {/* Download Button */}
      <Box sx={{ p: 2, bgcolor: 'white' }}>
        <Button 
          variant="contained" 
          fullWidth
          sx={{ bgcolor: '#1976d2' }}
        >
          💾 .bas 파일로 다운로드
        </Button>
      </Box>
    </Box>
  );
};

export default CodeViewer;
