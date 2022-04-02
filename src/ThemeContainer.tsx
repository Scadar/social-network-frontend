import React, {FC, useContext, useMemo, useState} from 'react';
import {createTheme, LinkProps, PaletteMode, ThemeOptions, ThemeProvider} from '@mui/material';
import {LinkBehavior} from './components/UI/LinkBehavior';
import {ToastContainer} from 'react-toastify';
import {getThemeModeFromLocalStorage, setThemeModeToLocalStorage} from './utils/localStorage';

declare module '@mui/material/styles' {

  interface Theme {
    layoutSize: {
      headerHeight: string
      sidebarWidth: string
      mainWidth: string
      spacing: string
      containerWidth: string
      topBarHeight: string
    };
  }

  interface ThemeOptions {
    layoutSize: {
      headerHeight: string
      sidebarWidth: string
      mainWidth: string
      spacing: string
      containerWidth: string
      topBarHeight: string
    };
  }

}

const light = {
  defaultBackgroundColor: '#edeef0',
  paperBackgroundColor: '#fff',
};

const dark = {
  defaultBackgroundColor: '#222226',
  paperBackgroundColor: '#333336',
};

const layoutSize = {
  headerHeight: '48px',
  mainWidth: '750px',
  sidebarWidth: '150px',
  spacing: '16px',
};

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
        ? {
          background: {
            default: light.defaultBackgroundColor,
            paper: light.paperBackgroundColor,
          },
        }
        : {
          background: {
            default: dark.defaultBackgroundColor,
            paper: dark.paperBackgroundColor,
          },
        }),
  },
  layoutSize: {
    ...layoutSize,
    containerWidth: `calc(${layoutSize.sidebarWidth} + ${layoutSize.mainWidth} + ${layoutSize.spacing})`,
    topBarHeight: '57px'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...(mode === 'light'
                  ? {
                    backgroundColor: light.defaultBackgroundColor,
                  } : {
                    backgroundColor: dark.defaultBackgroundColor,
                  }
          ),
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'text.primary',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiIcon: {
      defaultProps: {
        color: 'inherit',
      },
    },
  },
});

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  },
  mode: 'dark',
});

export const useThemeColorMode = () => {
  const context = useContext(ColorModeContext);
  return {
    toggle: context.toggleColorMode,
    mode: context.mode,
  };
};

const ThemeContainer: FC = ({children}) => {
  const themeMode = getThemeModeFromLocalStorage();
  const [mode, setMode] = useState<PaletteMode>(themeMode ?? 'light');

  const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode: PaletteMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            setThemeModeToLocalStorage(newMode);
            return newMode;
          });
        },
        mode,
      }),
      [mode],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {children}
          <ToastContainer
              theme={mode}
              toastStyle={{
                backgroundColor: theme.palette.background.paper,
                background: theme.palette.background.paper,
              }}
              autoClose={2000}
              limit={2}
              position={'bottom-center'}
          />
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
};

export default ThemeContainer;
