/**
 * Main Layout Component
 * 3-panel layout: Block Library (left) | Workspace (center) | Code Viewer (right)
 */

import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import BlockLibrary from '../BlockLibrary/BlockLibrary';
import Workspace from '../Workspace/Workspace';
import CodeViewer from '../CodeViewer/CodeViewer';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🎯 VBA 블록 코딩 시스템 v1.0
          </Typography>
          <Button color="inherit">📖 매뉴얼</Button>
          <Button color="inherit">📝 예제</Button>
          <Button color="inherit">💾 저장</Button>
          <Button color="inherit">📂 불러오기</Button>
          <Button color="inherit">🗑️ 초기화</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content - 3 Panels */}
      <Box sx={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden',
        minWidth: '1024px' 
      }}>
        {/* Block Library Panel (Left) */}
        <Box sx={{ 
          width: '250px', 
          borderRight: '1px solid #ddd',
          overflow: 'auto',
          bgcolor: '#f5f5f5'
        }}>
          <BlockLibrary />
        </Box>

        {/* Workspace Panel (Center) */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          bgcolor: '#fafafa',
          p: 2
        }}>
          <Workspace />
        </Box>

        {/* Code Viewer Panel (Right) */}
        <Box sx={{ 
          width: '400px', 
          borderLeft: '1px solid #ddd',
          overflow: 'hidden',
          bgcolor: '#fff'
        }}>
          <CodeViewer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
