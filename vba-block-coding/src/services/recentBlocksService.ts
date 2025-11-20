/**
 * Service for managing recent blocks usage
 */

const RECENT_BLOCKS_KEY = 'vba_recent_blocks';
const MAX_RECENT_BLOCKS = 10;

export interface RecentBlock {
  blockType: string;
  lastUsed: string; // ISO date string
  useCount: number;
}

/**
 * Get recent blocks from localStorage
 */
export const getRecentBlocks = (): RecentBlock[] => {
  try {
    const stored = localStorage.getItem(RECENT_BLOCKS_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load recent blocks:', error);
    return [];
  }
};

/**
 * Add a block to recent blocks
 */
export const addRecentBlock = (blockType: string): void => {
  try {
    const recentBlocks = getRecentBlocks();
    
    // Find existing block
    const existingIndex = recentBlocks.findIndex(rb => rb.blockType === blockType);
    
    if (existingIndex >= 0) {
      // Update existing block
      const existing = recentBlocks[existingIndex];
      recentBlocks.splice(existingIndex, 1);
      recentBlocks.unshift({
        blockType,
        lastUsed: new Date().toISOString(),
        useCount: existing.useCount + 1
      });
    } else {
      // Add new block
      recentBlocks.unshift({
        blockType,
        lastUsed: new Date().toISOString(),
        useCount: 1
      });
    }
    
    // Keep only MAX_RECENT_BLOCKS
    const trimmed = recentBlocks.slice(0, MAX_RECENT_BLOCKS);
    
    localStorage.setItem(RECENT_BLOCKS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save recent block:', error);
  }
};

/**
 * Clear recent blocks
 */
export const clearRecentBlocks = (): void => {
  try {
    localStorage.removeItem(RECENT_BLOCKS_KEY);
  } catch (error) {
    console.error('Failed to clear recent blocks:', error);
  }
};
