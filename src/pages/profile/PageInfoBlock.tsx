import React, {FC} from 'react';
import {Box, Divider, Paper, Stack, Typography} from '@mui/material';
import {IUser} from '../../models/authModels';
import {flexStyles} from '../../utils/styleUtils';

const tempData = [
  {
    key: 'День рождения:',
    value: '29 апреля',
  },
  {
    key: 'Родной город:',
    value: 'Тольятти',
  },
  {
    key: 'Моб. телефон:',
    value: '89674834481',
  },
];

const temData2 = [
  {
    key: 'друга',
    value: 64,
  },

  {
    key: 'фотография',
    value: 1,
  },
];

type PageInfoProps = {
  user: IUser
}

const PageInfoBlock: FC<PageInfoProps> = ({user}) => {
  return (
      <Paper sx={{paddingBottom: 2}}>
        <Box sx={{padding: 2}}>
          <Typography
              variant="h6"
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography
              variant="caption"
          >
            {user.statusDescription ?? 'empty'}
          </Typography>
          <Divider sx={{my: 2}}/>
          <Stack spacing={1}>
            {
              tempData.map(item => {
                return (
                    <Box
                        key={item.key}
                        sx={{display: 'flex'}}
                    >
                      <Box sx={{width: '145px'}}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="medium"
                        >
                          {item.key}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                            variant="caption"
                            color="primary"
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                );
              })
            }
          </Stack>
        </Box>
        <Divider sx={{my: 2}}/>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          {
            temData2.map(item => {
              return (
                  <Box
                      key={item.key}
                      sx={{
                        ...flexStyles('center', 'center', 'column'),
                      }}
                  >
                    <Typography color="primary" fontSize={24}>{item.value}</Typography>
                    <Typography variant="caption" color="primary">{item.key}</Typography>
                  </Box>
              );
            })
          }
        </Stack>
      </Paper>
  );
};

export default PageInfoBlock;
