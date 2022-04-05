import React, {FC, useMemo, useState} from 'react';
import PageTopWrapper from '../../layouts/pageWrapper/PageTopWrapper';
import {Box, Breadcrumbs, IconButton, Link, Stack} from '@mui/material';
import {diskApi} from '../../services/diskService';
import DiskDialog from './DiskDialog';
import {isErrorWithMessage} from '../../utils/queryErrors';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

function getReverseArr(input: any[]) {
  const ret: any[] = [];
  for (let i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}

type DiskTopPanelProps = {
  parentId?: string
  path: string[]
}

const DiskTopPanel: FC<DiskTopPanelProps> = ({parentId, path}) => {

  const [open, setOpen] = useState(false);
  const [createDir, {isLoading, error, reset}] = diskApi.useCreateDirMutation();

  const errorMessage = useMemo(() => {
    if (error) {
      if (isErrorWithMessage(error)) {
        if (error.data.message === 'File already exist') {
          return 'Такая папка уже существует';
        }
      }
      return 'Ошибка';
    } else {
      return undefined;
    }
  }, [error]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    reset();
  };

  const handleCreateDir = (dirName: string) => {
    if (!dirName) return;

    createDir({name: dirName, parentId: parentId})
        .unwrap()
        .then(() => {
          closeDialog();
        });

  };

  const pathWithHref: { path: string, href: string }[] = useMemo(() => {
    const result: { path: string, href: string }[] = [];
    path.forEach((p, index) => {
      result.push({
        path: p,
        href: path.slice(0, index + 1).join('/'),
      });
    });
    return result;
  }, [path]);
  console.log(pathWithHref);
  return (
      <PageTopWrapper sx={{display: 'flex', alignItems: 'center'}}>
        <Stack
            spacing={1}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              width: '100%',
              height: '100%',
            }}
        >
          <Box
              sx={{
                display: 'flex',
                overflow: 'hidden',
              }}
          >
            <Link
                color="inherit"
                href="/disk"
                sx={{
                  mr: 1,
                  '&::after': {
                    content: '" ›"',
                  },
                  whiteSpace: 'nowrap',
                  textDecoration: 'none'
                }}
                flexWrap={'nowrap'}
            >
              Файлы
            </Link>
            <Breadcrumbs
                separator={'›'}
                sx={{
                  flexGrow: 1,
                  '.MuiBreadcrumbs-ol': {
                    flexWrap: 'nowrap',
                    flexDirection: 'row-reverse',
                  },
                  overflow: 'hidden',
                }}
            >
              {
                getReverseArr(pathWithHref).map((item, index) => {
                  return (
                      <Link key={index} underline="hover" color="inherit" href={item.href}>
                        {item.path}
                      </Link>
                  );
                })
              }
            </Breadcrumbs>
          </Box>
          <IconButton sx={{color: 'primary.main'}} size="small" onClick={openDialog}>
            <CreateNewFolderIcon/>
          </IconButton>
        </Stack>
        {
            open &&
            <DiskDialog
                open={open}
                onSubmit={handleCreateDir}
                title="Создать папку"
                handleClose={closeDialog}
                isLoading={isLoading}
                errorText={errorMessage}
            />
        }
      </PageTopWrapper>
  );
};

export default DiskTopPanel;
