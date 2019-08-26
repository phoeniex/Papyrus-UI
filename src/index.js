import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import { Root } from './containers/root';
import { Screen } from './containers/screen';

// Styles
import './styles/main.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#004DC2',
    },
  },
});

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <Router>
      <Route exact path='/'><Redirect to='/module/0' /></Route>
      <Route path='/module/:id' component={Root} />
      <Route path='/screen/:id' component={Screen} />
    </Router>
  </ThemeProvider>
), document.getElementById('app'));
