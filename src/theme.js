import { createTheme } from '@mui/material/styles';
import { arEG } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    typography: {
      fontFamily: '"Cairo", "Roboto", sans-serif',
    },
    palette: {
      primary: { main: '#1565c0' },
      secondary: { main: '#f50057' },
      background: { default: '#f7f9fc' },
    },
  },
  arEG
);

export default theme;
