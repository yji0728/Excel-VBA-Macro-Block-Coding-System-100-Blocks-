/**
 * Code Generation Service
 * Generates VBA code from block instances
 */

import { BlockInstance } from '../types/block';
import { getBlockById } from '../data/blockDefinitions';

/**
 * Generate VBA code for a single block
 */
export const generateBlockCode = (block: BlockInstance): string => {
  const blockDef = getBlockById(block.blockType);
  
  if (!blockDef) {
    return `' Error: Block definition not found for ${block.blockType}`;
  }

  let code = blockDef.codeTemplate;

  // Replace parameters in template
  blockDef.parameters.forEach((param) => {
    const value = block.parameters[param.name] || param.placeholder || '';
    const placeholder = `{${param.name}}`;
    code = code.replace(new RegExp(placeholder, 'g'), value);
  });

  return code;
};

/**
 * Generate complete VBA Sub procedure from all blocks
 */
export const generateVBACode = (blocks: BlockInstance[]): string => {
  if (blocks.length === 0) {
    return `Sub GeneratedMacro()
    ' 블록이 추가되면 여기에 VBA 코드가 생성됩니다
    
End Sub`;
  }

  let code = 'Sub GeneratedMacro()\n';
  
  blocks.forEach((block, index) => {
    const blockDef = getBlockById(block.blockType);
    
    if (blockDef) {
      // Add comment separator
      code += `    ' ───────────────────────────────────\n`;
      code += `    ' 블록 ${index + 1}: ${blockDef.name}\n`;
      code += `    ' ───────────────────────────────────\n`;
      
      // Add block code with proper indentation
      const blockCode = generateBlockCode(block);
      const lines = blockCode.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          code += `    ${line}\n`;
        }
      });
      
      code += '\n';
    }
  });
  
  code += 'End Sub';
  
  return code;
};

/**
 * Format VBA code with proper indentation
 */
export const formatVBACode = (code: string): string => {
  // Basic formatting - can be enhanced later
  return code;
};

/**
 * Validate VBA code (basic validation)
 */
export const validateVBACode = (code: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check if Sub...End Sub pairs match
  const subCount = (code.match(/\bSub\b/g) || []).length;
  const endSubCount = (code.match(/\bEnd Sub\b/g) || []).length;
  
  if (subCount !== endSubCount) {
    errors.push('Sub와 End Sub의 개수가 일치하지 않습니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Export code to .bas file
 */
export const exportToBasFile = (code: string, filename: string = 'GeneratedMacro'): void => {
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.bas`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy code to clipboard
 */
export const copyToClipboard = async (code: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(code);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
