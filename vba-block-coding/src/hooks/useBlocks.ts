/**
 * Custom hooks for block management
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook for blocks
export const useBlocks = () => {
  const blocks = useAppSelector((state) => state.blocks.blocks);
  const selectedBlockId = useAppSelector((state) => state.blocks.selectedBlockId);
  const currentProject = useAppSelector((state) => state.blocks.currentProject);

  return {
    blocks,
    selectedBlockId,
    currentProject,
  };
};
