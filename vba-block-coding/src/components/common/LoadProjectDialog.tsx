/**
 * Load Project Dialog
 * Dialog for loading saved projects
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProjectsList, deleteProject as deleteProjectFromStorage } from '../../services/storageService';

interface ProjectListItem {
  id: string;
  name: string;
  blockCount: number;
  updatedAt: Date;
}

interface LoadProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onLoad: (projectId: string) => void;
}

const LoadProjectDialog: React.FC<LoadProjectDialogProps> = ({
  open,
  onClose,
  onLoad
}) => {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      loadProjectsList();
    }
  }, [open]);

  const loadProjectsList = () => {
    const projectsList = getProjectsList();
    // Sort by updatedAt descending
    projectsList.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    setProjects(projectsList);
    setSelectedProjectId(null);
  };

  const handleLoad = () => {
    if (selectedProjectId) {
      onLoad(selectedProjectId);
      onClose();
    }
  };

  const handleDelete = (projectId: string, projectName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm(`"${projectName}" 프로젝트를 삭제하시겠습니까?`)) {
      deleteProjectFromStorage(projectId);
      loadProjectsList();
    }
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return '오늘';
    } else if (days === 1) {
      return '어제';
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>프로젝트 불러오기</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {projects.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              저장된 프로젝트가 없습니다
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
              블록을 조합하고 '저장' 버튼을 눌러 프로젝트를 저장하세요
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {projects.map((project, index) => (
              <React.Fragment key={project.id}>
                {index > 0 && <Divider />}
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => handleDelete(project.id, project.name, e)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    selected={selectedProjectId === project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          📦 {project.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {project.blockCount}개 블록 · {formatDate(project.updatedAt)}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          취소
        </Button>
        <Button
          onClick={handleLoad}
          variant="contained"
          disabled={!selectedProjectId}
        >
          불러오기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadProjectDialog;
