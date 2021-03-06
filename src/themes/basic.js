import * as Colors from '@mui/material/colors'

export const darkTheme = {
  mode: 'dark',
  shape: {
    borderRadius: 4
  },
  palette: {
    primary: {
      main: Colors.blueGrey['A700'],
    },
    secondary: {
      main:'#ffffff',
    },
  },
};

export const lightTheme = {
  mode: 'light',
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  palette: {
    primary: {
      main: Colors.grey[50],
    },
    secondary: {
      main: '#000000',
    },
  },
  props: {
    MuiAppBar: {
      color: 'default',
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + $track': {
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition:
          'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
  },
};