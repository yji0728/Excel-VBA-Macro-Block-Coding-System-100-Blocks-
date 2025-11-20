/**
 * Block Instance Component
 * Displays a block instance in the workspace
 */

import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BlockInstance as BlockInstanceType } from '../../types/block';
import { getBlockById } from '../../data/blockDefinitions';
import { useAppDispatch } from '../../hooks/useBlocks';
import { deleteBlock, updateBlock } from '../../store/slices/blockSlice';
import BlockEditor from '../BlockEditor/BlockEditor';

interface BlockInstanceProps {
  block: BlockInstanceType;
}

const BlockInstance: React.FC<BlockInstanceProps> = ({ block }) => {
  const dispatch = useAppDispatch();
  const blockDef = getBlockById(block.blockType);
  const [editorOpen, setEditorOpen] = React.useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!blockDef) {
    return null;
  }

  const handleDelete = () => {
    dispatch(deleteBlock(block.id));
  };

  const handleEdit = () => {
    setEditorOpen(true);
  };

  const handleEditorClose = () => {
    setEditorOpen(false);
  };

  const handleEditorSave = (blockId: string, parameters: { [key: string]: any }) => {
    dispatch(updateBlock({ id: blockId, updates: { parameters } }));
  };

  return (
    <>
      <Paper
        ref={setNodeRef}
        style={style}
        elevation={2}
        onDoubleClick={handleEdit}
        sx={{
          mb: 2,
          p: 2,
          border: `2px solid ${blockDef.color}`,
          borderLeft: `6px solid ${blockDef.color}`,
          bgcolor: 'white',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#fafafa'
          }
        }}
      >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        {/* Drag Handle */}
        <Box
          {...attributes}
          {...listeners}
          sx={{
            cursor: 'grab',
            color: blockDef.color,
            '&:active': {
              cursor: 'grabbing'
            }
          }}
        >
          <DragIndicatorIcon />
        </Box>

        {/* Block Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: blockDef.color, mb: 1 }}
          >
            {blockDef.id}. {blockDef.name}
          </Typography>

          {/* Parameters */}
          {blockDef.parameters.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {blockDef.parameters.map((param) => (
                <Box key={param.name} sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                    📝 {param.name}: <strong>{block.parameters[param.name] || param.placeholder || '(미입력)'}</strong>
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Code Preview */}
          <Box sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: 'text.secondary',
                display: 'block',
                whiteSpace: 'pre-wrap'
              }}
            >
              {blockDef.codeTemplate}
            </Typography>
          </Box>
        </Box>

        {/* Delete Button */}
        <IconButton
          size="small"
          color="error"
          onClick={handleDelete}
          sx={{ alignSelf: 'flex-start' }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>

    <BlockEditor
      open={editorOpen}
      block={block}
      onClose={handleEditorClose}
      onSave={handleEditorSave}
    />
  </>
  );
};

export default BlockInstance;
