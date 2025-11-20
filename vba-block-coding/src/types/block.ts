/**
 * Block type definitions for VBA Block Coding System
 */

export enum ParameterType {
  STRING = "string",
  NUMBER = "number",
  RANGE = "range",
  BOOLEAN = "boolean",
  ENUM = "enum",
  COLOR = "color",
  FILE_PATH = "file_path"
}

export interface ValidationRule {
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean;
  errorMessage: string;
}

export interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
  defaultValue?: any;
  validation?: ValidationRule;
  placeholder?: string;
  options?: string[];
}

export interface BlockDefinition {
  id: string;
  category: string;
  categoryNumber: number;
  blockNumber: number;
  name: string;
  color: string;
  parameters: Parameter[];
  codeTemplate: string;
  description: string;
  examples: string[];
}

export interface BlockInstance {
  id: string;
  blockType: string;
  position: number;
  parameters: { [key: string]: any };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMetadata {
  tags: string[];
  author?: string;
  thumbnail?: string;
  blockCount: number;
  codeLength: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  blocks: BlockInstance[];
  metadata: ProjectMetadata;
  createdAt: Date;
  updatedAt: Date;
  version: string;
}
