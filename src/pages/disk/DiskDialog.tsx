import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type DiskDialogProps = {
  open: boolean
  handleClose: () => void
  title: string
  onSubmit: (text: string) => void
  isLoading: boolean
  errorText?: string
}

const DiskDialog: FC<DiskDialogProps> = ({open, handleClose, title, onSubmit, isLoading, errorText}) => {

  const [text, setText] = useState('');

  return (
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
              component="form"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                onSubmit(text);
              }}
          >
            <Stack spacing={1}>
              <TextField
                  value={text}
                  onChange={e => setText(e.target.value)}
                  fullWidth
                  autoFocus
              />
              {
                  errorText &&
                  <Typography
                      variant="caption"
                      color="error"
                  >
                    {errorText}
                  </Typography>
              }
              <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
              >
                <ButtonGroup>
                  <Button color="error" onClick={handleClose}>Отмена</Button>
                  <Button disabled={isLoading} type="submit">Сохранить</Button>
                </ButtonGroup>
              </Box>
            </Stack>
          </Box>

        </DialogContent>
      </Dialog>
  );
};

export default DiskDialog;
