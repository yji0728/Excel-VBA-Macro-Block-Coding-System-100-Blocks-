/**
 * Block Card Component
 * Displays a single block in the library with drag functionality
 */

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { BlockDefinition } from '../../types/block';

interface BlockCardProps {
  block: BlockDefinition;
}

const BlockCard: React.FC<BlockCardProps> = ({ block }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: '100%',
        p: 1.5,
        cursor: 'grab',
        bgcolor: 'white',
        border: `2px solid ${block.color}`,
        borderLeft: `6px solid ${block.color}`,
        '&:hover': {
          bgcolor: '#f5f5f5',
          transform: 'translateX(2px)',
          transition: 'all 0.2s'
        },
        '&:active': {
          cursor: 'grabbing'
        }
      }}
    >
      <Typography 
        variant="body2" 
        fontWeight="bold" 
        sx={{ 
          color: block.color,
          mb: 0.5,
          fontSize: '0.85rem'
        }}
      >
        {block.id}. {block.name}
      </Typography>
      
      <Typography 
        variant="caption" 
        sx={{ 
          display: 'block',
          color: 'text.secondary',
          fontSize: '0.7rem',
          mb: 0.5
        }}
      >
        {block.description}
      </Typography>

      {block.parameters.length > 0 && (
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            color: 'text.disabled',
            fontSize: '0.65rem',
            fontStyle: 'italic'
          }}
        >
          매개변수: {block.parameters.map(p => p.name).join(', ')}
        </Typography>
      )}

      <Box sx={{ 
        mt: 0.5, 
        pt: 0.5, 
        borderTop: '1px dashed #e0e0e0'
      }}>
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            color: 'text.secondary',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {block.codeTemplate}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BlockCard;
