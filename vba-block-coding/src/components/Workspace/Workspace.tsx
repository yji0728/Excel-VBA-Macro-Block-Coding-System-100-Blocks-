/**
 * Workspace Component
 * Main working area where users assemble blocks
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBlocks } from '../../hooks/useBlocks';
import BlockInstance from './BlockInstance';

const Workspace: React.FC = () => {
  const { blocks } = useBlocks();
  const { setNodeRef, isOver } = useDroppable({
    id: 'workspace',
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        작업 공간 ({blocks.length} 블록)
      </Typography>

      {/* Workspace Area */}
      <Box
        ref={setNodeRef}
        sx={{
          flex: 1,
          overflow: 'auto',
          border: '2px dashed #ddd',
          borderRadius: 2,
          bgcolor: isOver ? '#e3f2fd' : 'white',
          p: 2,
          transition: 'background-color 0.2s'
        }}
      >
        {blocks.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
        ) : (
          <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            {blocks.map((block) => (
              <BlockInstance key={block.id} block={block} />
            ))}
          </SortableContext>
        )}
      </Box>
    </Box>
  );
};

export default Workspace;
