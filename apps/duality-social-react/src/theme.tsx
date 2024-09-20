import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' if you're using a dark theme
    primary: {
      main: '#2e007f', // Your primary color
      contrastText: '#ffffff', // This ensures text on primary color backgrounds is white
    },
    background: {
      default: '#ffffff', // or whatever your background color is
      paper: '#ffffff',
    },
    text: {
      primary: '#000000', // This ensures most text is black
      secondary: '#000000', // This makes secondary text black as well
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: '#ffffff', // This ensures text in AppBar (like in TopMenu) is white
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'inherit', // This should make form labels inherit the text color
        },
      },
    },
  },
});

export default theme;
