/**
 * Block Library Component
 * Displays categories and blocks in a tree view
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { CATEGORIES, getBlocksByCategory, getBlockById } from '../../data/blockDefinitions';
import { getRecentBlocks } from '../../services/recentBlocksService';
import BlockCard from './BlockCard';

const BlockLibrary: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0])); // Expand "Recent" by default
  const [searchQuery, setSearchQuery] = useState('');
  const [recentBlockTypes, setRecentBlockTypes] = useState<string[]>([]);

  // Load recent blocks on mount
  useEffect(() => {
    const recent = getRecentBlocks();
    setRecentBlockTypes(recent.map(rb => rb.blockType));
  }, []);

  const handleCategoryClick = (categoryNumber: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryNumber)) {
      newExpanded.delete(categoryNumber);
    } else {
      newExpanded.add(categoryNumber);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter blocks based on search query
  const filterBlocks = useCallback((blocks: any[]) => {
    if (!searchQuery.trim()) {
      return blocks;
    }
    
    const query = searchQuery.toLowerCase();
    return blocks.filter(block => {
      // Search in block name
      if (block.name.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in block description
      if (block.description.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in parameter names
      if (block.parameters && block.parameters.length > 0) {
        const hasMatchingParam = block.parameters.some((param: any) => 
          param.name.toLowerCase().includes(query)
        );
        if (hasMatchingParam) {
          return true;
        }
      }
      
      return false;
    });
  }, [searchQuery]);

  // Auto-expand categories when searching
  React.useEffect(() => {
    if (searchQuery.trim()) {
      // Expand all categories that have matching blocks
      const categoriesToExpand = new Set<number>();
      CATEGORIES.forEach(category => {
        const blocks = getBlocksByCategory(category.number);
        const filtered = filterBlocks(blocks);
        if (filtered.length > 0) {
          categoriesToExpand.add(category.number);
        }
      });
      setExpandedCategories(categoriesToExpand);
    }
  }, [searchQuery, filterBlocks]);

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
          placeholder="블록 검색 (이름, 설명, 매개변수)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchQuery('')}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Divider />

      {/* Category List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List component="nav" disablePadding>
          {CATEGORIES.map((category) => {
            const isExpanded = expandedCategories.has(category.number);
            
            // Special handling for "Recent Blocks" category
            let allBlocks;
            if (category.number === 0) {
              // Get recent blocks
              allBlocks = recentBlockTypes
                .map(blockType => getBlockById(blockType))
                .filter(block => block !== undefined);
            } else {
              allBlocks = getBlocksByCategory(category.number);
            }
            
            const filteredBlocks = filterBlocks(allBlocks);
            
            // Don't show category if no blocks match search
            if (searchQuery.trim() && filteredBlocks.length === 0) {
              return null;
            }
            
            // Don't show "Recent Blocks" if empty
            if (category.number === 0 && filteredBlocks.length === 0) {
              return null;
            }
            
            return (
              <React.Fragment key={category.number}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleCategoryClick(category.number)}>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" fontWeight="medium">
                          {category.icon} {category.name} ({filteredBlocks.length})
                        </Typography>
                      }
                    />
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ bgcolor: '#fafafa' }}>
                    {filteredBlocks.length > 0 ? (
                      filteredBlocks.map((block) => (
                        <ListItem key={block.id} disablePadding sx={{ px: 1, py: 0.5 }}>
                          <BlockCard block={block} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <Typography variant="body2" color="text.secondary" sx={{ py: 1, px: 2 }}>
                          검색 결과가 없습니다.
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
        
        {/* No results message */}
        {searchQuery.trim() && CATEGORIES.every(category => {
          const blocks = getBlocksByCategory(category.number);
          return filterBlocks(blocks).length === 0;
        }) && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              "{searchQuery}"에 대한 검색 결과가 없습니다.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              다른 검색어를 시도해보세요.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BlockLibrary;
