/**
 * Validation utilities for block parameters
 */

import { Parameter, ParameterType } from '../types/block';

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validate a parameter value based on its definition
 */
export const validateParameter = (
  parameter: Parameter,
  value: any
): ValidationResult => {
  // Check required fields
  if (parameter.required && (!value || value.toString().trim() === '')) {
    return {
      isValid: false,
      errorMessage: '필수 항목입니다.'
    };
  }

  // If not required and empty, it's valid
  if (!value || value.toString().trim() === '') {
    return { isValid: true };
  }

  // Type-specific validation
  switch (parameter.type) {
    case ParameterType.NUMBER:
      return validateNumber(value, parameter);
    
    case ParameterType.RANGE:
      return validateRange(value);
    
    case ParameterType.FILE_PATH:
      return validateFilePath(value);
    
    case ParameterType.STRING:
      return validateString(value, parameter);
    
    case ParameterType.BOOLEAN:
      return validateBoolean(value);
    
    default:
      return { isValid: true };
  }
};

/**
 * Validate number parameter
 */
const validateNumber = (value: any, parameter: Parameter): ValidationResult => {
  const num = Number(value);
  
  if (isNaN(num)) {
    return {
      isValid: false,
      errorMessage: '유효한 숫자를 입력하세요.'
    };
  }

  // Check validation rules
  if (parameter.validation) {
    const { min, max } = parameter.validation;
    
    if (min !== undefined && num < min) {
      return {
        isValid: false,
        errorMessage: `${min} 이상의 값을 입력하세요.`
      };
    }
    
    if (max !== undefined && num > max) {
      return {
        isValid: false,
        errorMessage: `${max} 이하의 값을 입력하세요.`
      };
    }
  }

  return { isValid: true };
};

/**
 * Validate cell range (e.g., A1, A1:C10)
 */
const validateRange = (value: string): ValidationResult => {
  const rangePattern = /^[A-Z]+\d+(:[A-Z]+\d+)?$/;
  
  if (!rangePattern.test(value.trim())) {
    return {
      isValid: false,
      errorMessage: '올바른 셀 범위를 입력하세요 (예: A1, A1:C10)'
    };
  }

  return { isValid: true };
};

/**
 * Validate file path
 */
const validateFilePath = (value: string): ValidationResult => {
  const filePathPattern = /^[A-Za-z]:\\.*\.(xlsx?|xlsm|xls|bas)$/;
  
  if (!filePathPattern.test(value.trim())) {
    return {
      isValid: false,
      errorMessage: '올바른 파일 경로를 입력하세요 (예: C:\\test.xlsx)'
    };
  }

  return { isValid: true };
};

/**
 * Validate string parameter
 */
const validateString = (value: string, parameter: Parameter): ValidationResult => {
  // Check pattern if provided
  if (parameter.validation?.pattern) {
    if (!parameter.validation.pattern.test(value)) {
      return {
        isValid: false,
        errorMessage: parameter.validation.errorMessage || '형식이 올바르지 않습니다.'
      };
    }
  }

  return { isValid: true };
};

/**
 * Validate boolean parameter
 */
const validateBoolean = (value: any): ValidationResult => {
  if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
    return {
      isValid: false,
      errorMessage: '참(true) 또는 거짓(false)을 선택하세요.'
    };
  }

  return { isValid: true };
};

/**
 * Validate all parameters in a block
 */
export const validateAllParameters = (
  parameters: Parameter[],
  values: { [key: string]: any }
): { [key: string]: ValidationResult } => {
  const results: { [key: string]: ValidationResult } = {};

  parameters.forEach((param) => {
    results[param.name] = validateParameter(param, values[param.name]);
  });

  return results;
};

/**
 * Check if all parameters are valid
 */
export const areAllParametersValid = (
  validationResults: { [key: string]: ValidationResult }
): boolean => {
  return Object.values(validationResults).every(result => result.isValid);
};
