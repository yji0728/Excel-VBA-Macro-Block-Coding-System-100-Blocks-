/**
 * Block Library Component
 * Displays categories and blocks in a tree view
 */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Divider
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CATEGORIES, getBlocksByCategory } from '../../data/blockDefinitions';
import BlockCard from './BlockCard';

const BlockLibrary: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (categoryNumber: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryNumber)) {
      newExpanded.delete(categoryNumber);
    } else {
      newExpanded.add(categoryNumber);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: 'white' }}>
        <Typography variant="h6" gutterBottom>
          블록 라이브러리
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="🔍 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mt: 1 }}
        />
      </Box>
      <Divider />

      {/* Category List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List component="nav" disablePadding>
          {CATEGORIES.map((category) => {
            const isExpanded = expandedCategories.has(category.number);
            const blocks = getBlocksByCategory(category.number);
            
            return (
              <React.Fragment key={category.number}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleCategoryClick(category.number)}>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" fontWeight="medium">
                          {category.icon} {category.name} ({blocks.length})
                        </Typography>
                      }
                    />
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ bgcolor: '#fafafa' }}>
                    {blocks.map((block) => (
                      <ListItem key={block.id} disablePadding sx={{ px: 1, py: 0.5 }}>
                        <BlockCard block={block} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default BlockLibrary;
