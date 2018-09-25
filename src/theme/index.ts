import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['sans-serif'].join(','),
    fontSize: 14,
  },

  palette: {
    primary: { main: '#FB9678' },
    secondary: { main: '#3AB7F1' },
    action: {
      // selected: 'rgb(251, 171, 147)',
      // hover: 'rgb(251, 171, 147)',
      active: '#000',
    },
  },
});
