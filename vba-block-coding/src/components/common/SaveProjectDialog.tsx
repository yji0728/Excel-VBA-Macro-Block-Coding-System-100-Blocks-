/**
 * Save Project Dialog
 * Dialog for saving a project with name and description
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';

interface SaveProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  defaultName?: string;
  defaultDescription?: string;
}

const SaveProjectDialog: React.FC<SaveProjectDialogProps> = ({
  open,
  onClose,
  onSave,
  defaultName = '',
  defaultDescription = ''
}) => {
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);

  React.useEffect(() => {
    if (open) {
      setName(defaultName);
      setDescription(defaultDescription);
    }
  }, [open, defaultName, defaultDescription]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), description.trim());
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>프로젝트 저장</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            label="프로젝트 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            required
            error={!name.trim()}
            helperText={!name.trim() ? '프로젝트 이름을 입력하세요' : ''}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="설명 (선택사항)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          취소
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!name.trim()}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveProjectDialog;
