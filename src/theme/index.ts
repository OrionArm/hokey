import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: { main: '#FB9678' },
    secondary: { main: '#3AB7F1' },
    action: {
      selected: 'rgb(251, 171, 147)',
      hover: 'rgb(251, 171, 147)',
      active: 'black',
    },
  },
});
