/**
 * Block Editor Modal
 * Modal for editing block parameters
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Divider,
  Paper,
  FormHelperText
} from '@mui/material';
import { BlockInstance } from '../../types/block';
import { Parameter, ParameterType } from '../../types/block';
import { getBlockById } from '../../data/blockDefinitions';
import { validateParameter, ValidationResult } from '../../utils/validation';
import { generateBlockCode } from '../../services/codeGenerator';

interface BlockEditorProps {
  open: boolean;
  block: BlockInstance | null;
  onClose: () => void;
  onSave: (blockId: string, parameters: { [key: string]: any }) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ open, block, onClose, onSave }) => {
  const [parameterValues, setParameterValues] = useState<{ [key: string]: any }>({});
  const [validationResults, setValidationResults] = useState<{ [key: string]: ValidationResult }>({});
  const [codePreview, setCodePreview] = useState('');

  const blockDef = block ? getBlockById(block.blockType) : null;

  useEffect(() => {
    if (block && blockDef) {
      // Initialize parameter values
      const initialValues: { [key: string]: any } = {};
      blockDef.parameters.forEach(param => {
        initialValues[param.name] = block.parameters[param.name] || param.defaultValue || '';
      });
      setParameterValues(initialValues);

      // Initialize validation results
      const initialValidation: { [key: string]: ValidationResult } = {};
      blockDef.parameters.forEach(param => {
        initialValidation[param.name] = { isValid: true };
      });
      setValidationResults(initialValidation);

      // Generate initial code preview
      if (block && blockDef) {
        const tempBlock = { ...block, parameters: initialValues };
        const code = generateBlockCode(tempBlock);
        setCodePreview(code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, blockDef]);

  const updateCodePreview = (values: { [key: string]: any }) => {
    if (block && blockDef) {
      const tempBlock = { ...block, parameters: values };
      const code = generateBlockCode(tempBlock);
      setCodePreview(code);
    }
  };

  const handleParameterChange = (paramName: string, value: any, param: Parameter) => {
    const newValues = { ...parameterValues, [paramName]: value };
    setParameterValues(newValues);

    // Validate the parameter
    const validation = validateParameter(param, value);
    setValidationResults(prev => ({ ...prev, [paramName]: validation }));

    // Update code preview
    updateCodePreview(newValues);
  };

  const handleSave = () => {
    if (!block || !blockDef) return;

    // Validate all parameters
    const allValidations: { [key: string]: ValidationResult } = {};
    let allValid = true;

    blockDef.parameters.forEach(param => {
      const validation = validateParameter(param, parameterValues[param.name]);
      allValidations[param.name] = validation;
      if (!validation.isValid) {
        allValid = false;
      }
    });

    setValidationResults(allValidations);

    if (allValid) {
      onSave(block.id, parameterValues);
      onClose();
    }
  };

  const renderParameterInput = (param: Parameter) => {
    const value = parameterValues[param.name] || '';
    const validation = validationResults[param.name];
    const hasError = validation && !validation.isValid;

    switch (param.type) {
      case ParameterType.STRING:
      case ParameterType.FILE_PATH:
      case ParameterType.RANGE:
        return (
          <TextField
            fullWidth
            label={param.name}
            value={value}
            onChange={(e) => handleParameterChange(param.name, e.target.value, param)}
            placeholder={param.placeholder}
            required={param.required}
            error={hasError}
            helperText={hasError ? validation.errorMessage : param.placeholder}
            sx={{ mb: 2 }}
          />
        );

      case ParameterType.NUMBER:
        return (
          <TextField
            fullWidth
            type="number"
            label={param.name}
            value={value}
            onChange={(e) => handleParameterChange(param.name, e.target.value, param)}
            placeholder={param.placeholder}
            required={param.required}
            error={hasError}
            helperText={hasError ? validation.errorMessage : param.placeholder}
            inputProps={{
              min: param.validation?.min,
              max: param.validation?.max
            }}
            sx={{ mb: 2 }}
          />
        );

      case ParameterType.BOOLEAN:
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleParameterChange(param.name, e.target.checked, param)}
              />
            }
            label={param.name}
            sx={{ mb: 2 }}
          />
        );

      case ParameterType.ENUM:
        return (
          <FormControl fullWidth sx={{ mb: 2 }} error={hasError}>
            <InputLabel>{param.name}</InputLabel>
            <Select
              value={value}
              label={param.name}
              onChange={(e) => handleParameterChange(param.name, e.target.value, param)}
            >
              {param.options?.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{validation.errorMessage}</FormHelperText>}
          </FormControl>
        );

      default:
        return null;
    }
  };

  if (!block || !blockDef) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '500px' }
      }}
    >
      <DialogTitle sx={{ bgcolor: blockDef.color, color: 'white' }}>
        <Typography variant="h6">
          블록 편집: {blockDef.name}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
          {blockDef.id} - {blockDef.category}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {blockDef.description}
          </Typography>
        </Box>

        {blockDef.parameters.length > 0 ? (
          <>
            <Typography variant="subtitle2" gutterBottom>
              매개변수 설정
            </Typography>
            <Box sx={{ mt: 2 }}>
              {blockDef.parameters.map(param => (
                <Box key={param.name}>
                  {renderParameterInput(param)}
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            이 블록은 매개변수가 없습니다.
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" gutterBottom>
          코드 미리보기
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: '#1e1e1e',
            color: '#d4d4d4',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.85rem',
            whiteSpace: 'pre-wrap',
            mt: 1
          }}
        >
          {codePreview}
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          취소
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          적용
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockEditor;
