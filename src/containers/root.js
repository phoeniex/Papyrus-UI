import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import { TitleBar } from '../components/title-bar';
import { ModuleTabs } from '../components/module-tab'
import { ModuleContainer } from './module-container';

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

export const Root = (props) => {
  const classes = useStyles();
  const id = parseInt(props.match.params.id, 10);

  return (
    <div>
      <AppBar className={classes.appBar} position="fixed">
        <TitleBar/>
        <ModuleTabs moduleId={id} />
      </AppBar>
      <ModuleContainer moduleId={id} />
    </div>
  );
}
