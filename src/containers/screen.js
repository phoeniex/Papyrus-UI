import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { TitleBar } from '../components/title-bar';
import { ScreenContainer } from './screen-container';
import { AppBar, Typography } from '@material-ui/core';

const { app } = window.require('electron').remote;

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
    backgroundColor: '#FCFCFC',
  },
  appBar: {
    backgroundColor: '#FCFCFC',
    boxShadow: 'none',
  },
}));

export const Screen = (props) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appBar} position="fixed">
        <TitleBar navigateBack moduleName='Test'/>
      </AppBar>
      <ScreenContainer/>
      <Typography><b> Electron: {process.versions.electron}</b></Typography>
      <Typography>Version: {app.getVersion()}</Typography>
    </div>
  );
}
