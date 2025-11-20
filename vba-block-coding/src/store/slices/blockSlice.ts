/**
 * Redux slice for block management
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockInstance, Project } from '../../types/block';
import { v4 as uuidv4 } from 'uuid';

interface BlockState {
  currentProject: Project | null;
  blocks: BlockInstance[];
  selectedBlockId: string | null;
}

const initialState: BlockState = {
  currentProject: null,
  blocks: [],
  selectedBlockId: null,
};

const blockSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<{ blockType: string; parameters?: { [key: string]: any } }>) => {
      const newBlock: BlockInstance = {
        id: uuidv4(),
        blockType: action.payload.blockType,
        position: state.blocks.length,
        parameters: action.payload.parameters || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.blocks.push(newBlock);
    },

    deleteBlock: (state, action: PayloadAction<string>) => {
      const blockId = action.payload;
      state.blocks = state.blocks.filter(block => block.id !== blockId);
      // Update positions
      state.blocks.forEach((block, index) => {
        block.position = index;
      });
      if (state.selectedBlockId === blockId) {
        state.selectedBlockId = null;
      }
    },

    updateBlock: (state, action: PayloadAction<{ id: string; updates: Partial<BlockInstance> }>) => {
      const { id, updates } = action.payload;
      const block = state.blocks.find(b => b.id === id);
      if (block) {
        Object.assign(block, updates);
        block.updatedAt = new Date();
      }
    },

    reorderBlocks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedBlock] = state.blocks.splice(sourceIndex, 1);
      state.blocks.splice(destinationIndex, 0, movedBlock);
      // Update positions
      state.blocks.forEach((block, index) => {
        block.position = index;
      });
    },

    setSelectedBlock: (state, action: PayloadAction<string | null>) => {
      state.selectedBlockId = action.payload;
    },

    clearWorkspace: (state) => {
      state.blocks = [];
      state.selectedBlockId = null;
    },

    loadProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
      state.blocks = action.payload.blocks;
      state.selectedBlockId = null;
    },
  },
});

export const {
  addBlock,
  deleteBlock,
  updateBlock,
  reorderBlocks,
  setSelectedBlock,
  clearWorkspace,
  loadProject,
} = blockSlice.actions;

export default blockSlice.reducer;
