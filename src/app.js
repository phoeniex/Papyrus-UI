import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

import TitleBar from './components/title-bar';
import ModuleTabs from './components/module-tab';

const { app } = window.require('electron').remote;
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
});

const useStyles = makeStyles(theme => ({
  appRoot: {
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
  versionLabel: {
    textAlign: 'center',
    fontSize: 'large',
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.appRoot}>
      <ThemeProvider theme={theme}>
        <TitleBar/>
        <ModuleTabs/>
        <p className={classes.versionLabel}>
          <b> Electron: {process.versions.electron}  </b>
          Version: {app.getVersion()}
        </p>
      </ThemeProvider>
    </div>
  );
}
