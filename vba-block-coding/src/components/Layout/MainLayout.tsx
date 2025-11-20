/**
 * Main Layout Component
 * 3-panel layout: Block Library (left) | Workspace (center) | Code Viewer (right)
 */

import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Snackbar, Alert } from '@mui/material';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import BlockLibrary from '../BlockLibrary/BlockLibrary';
import Workspace from '../Workspace/Workspace';
import CodeViewer from '../CodeViewer/CodeViewer';
import SaveProjectDialog from '../common/SaveProjectDialog';
import LoadProjectDialog from '../common/LoadProjectDialog';
import { useAppDispatch } from '../../hooks/useBlocks';
import { useBlocks } from '../../hooks/useBlocks';
import { addBlock, reorderBlocks, clearWorkspace, loadProject as loadProjectAction } from '../../store/slices/blockSlice';
import { saveProject, loadProject } from '../../services/storageService';

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { blocks, currentProject } = useBlocks();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    // Check if dragging from library to workspace
    if (active.data.current?.type === 'library-block' && over.id === 'workspace') {
      const block = active.data.current.block;
      dispatch(addBlock({ blockType: block.id }));
    }
    
    // Check if reordering within workspace
    if (over.id !== 'workspace' && active.id !== over.id) {
      // This is handled by SortableContext
      const activeIndex = parseInt(active.id as string, 10);
      const overIndex = parseInt(over.id as string, 10);
      
      if (!isNaN(activeIndex) && !isNaN(overIndex)) {
        dispatch(reorderBlocks({ sourceIndex: activeIndex, destinationIndex: overIndex }));
      }
    }
  };

  const handleClearWorkspace = () => {
    if (window.confirm('작업 공간을 초기화하시겠습니까?')) {
      dispatch(clearWorkspace());
      setSnackbarMessage('작업 공간이 초기화되었습니다');
      setSnackbarOpen(true);
    }
  };

  const handleSaveProject = (name: string, description: string) => {
    const project = saveProject(name, blocks, description, currentProject?.id);
    dispatch(loadProjectAction(project));
    setSnackbarMessage('프로젝트가 저장되었습니다');
    setSnackbarOpen(true);
  };

  const handleLoadProject = (projectId: string) => {
    const project = loadProject(projectId);
    if (project) {
      dispatch(loadProjectAction(project));
      setSnackbarMessage(`"${project.name}" 프로젝트가 로드되었습니다`);
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('프로젝트를 불러올 수 없습니다');
      setSnackbarOpen(true);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Top Navigation Bar */}
        <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              🎯 VBA 블록 코딩 시스템 v1.0
            </Typography>
            <Button color="inherit">📖 매뉴얼</Button>
            <Button color="inherit">📝 예제</Button>
            <Button color="inherit" onClick={() => setSaveDialogOpen(true)}>💾 저장</Button>
            <Button color="inherit" onClick={() => setLoadDialogOpen(true)}>📂 불러오기</Button>
            <Button color="inherit" onClick={handleClearWorkspace}>🗑️ 초기화</Button>
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

      <DragOverlay>
        {activeId ? (
          <Box sx={{ 
            p: 2, 
            bgcolor: 'white', 
            border: '2px solid #1976d2',
            borderRadius: 1,
            opacity: 0.8
          }}>
            <Typography>Dragging...</Typography>
          </Box>
        ) : null}
      </DragOverlay>

      <SaveProjectDialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={handleSaveProject}
        defaultName={currentProject?.name || ''}
        defaultDescription={currentProject?.description || ''}
      />

      <LoadProjectDialog
        open={loadDialogOpen}
        onClose={() => setLoadDialogOpen(false)}
        onLoad={handleLoadProject}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DndContext>
  );
};

export default MainLayout;
