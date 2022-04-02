import React, {FC, memo} from 'react';
import {Box, Paper, Theme} from '@mui/material';

type PageWrapperProps = {
  topHeight?: (theme: Theme) => string
  bottomHeight?: (theme: Theme) => string
  top?: React.ReactNode
  bottom?: React.ReactNode
  center: React.ReactNode
}

const PageWrapper: FC<PageWrapperProps> = memo(({
                                                  top,
                                                  center,
                                                  bottom,
                                                  topHeight,
                                                  bottomHeight,
                                                }) => {
  return (
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
      >
        {
          top
              ?
              <Box
                  sx={theme => ({
                    position: 'sticky',
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: theme.palette.background.default,
                    width: theme.layoutSize.mainWidth,
                    top: theme.layoutSize.headerHeight,
                    borderTop: `${theme.layoutSize.spacing} solid ${theme.palette.background.default}`,
                    height: topHeight
                        ?
                        `calc(${topHeight(theme)} + ${theme.layoutSize.spacing})`
                        :
                        `calc(${theme.layoutSize.topBarHeight} + ${theme.layoutSize.spacing})`,
                  })}
              >
                {top}
              </Box>
              :
              <Box
                  sx={theme => ({
                    position: 'sticky',
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: theme.palette.background.default,
                    width: theme.layoutSize.mainWidth,
                    top: theme.layoutSize.headerHeight,
                    borderTop: `${theme.layoutSize.spacing} solid ${theme.palette.background.default}`,
                  })}
              />
        }
        <Paper
            sx={{
              flexGrow: 1,
              borderTopLeftRadius: top ? 0 : undefined,
              borderTopRightRadius: top ? 0 : undefined,
              borderBottomRightRadius: bottom ? 0 : undefined,
              borderBottomLeftRadius: bottom ? 0 : undefined,
              height: '100%',
            }}
        >
          {center}
        </Paper>
        {
          bottom ?
              <Box
                  sx={theme => ({
                    position: 'sticky',
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: theme.palette.background.default,
                    width: theme.layoutSize.mainWidth,
                    bottom: 0,
                    borderBottom: `${theme.layoutSize.spacing} solid ${theme.palette.background.default}`,
                    height: bottomHeight ? `calc(${bottomHeight(theme)} + ${theme.layoutSize.spacing})` : undefined,
                  })}
              >
                {bottom}
              </Box>
              :
              <Box
                  sx={theme => ({
                    position: 'sticky',
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: theme.palette.background.default,
                    width: theme.layoutSize.mainWidth,
                    bottom: 0,
                    borderBottom: `${theme.layoutSize.spacing} solid ${theme.palette.background.default}`,
                  })}
              />
        }

      </Box>
  );
});

export default PageWrapper;
