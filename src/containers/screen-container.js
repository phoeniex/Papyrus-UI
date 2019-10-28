import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    top: 60,
    left: 0,
    bottom: 0,
    position: 'absolute',
    overflow: 'auto',
    width: '100%',
    backgroundColor: '#FCFCFC',
  },
}));

export const ScreenContainer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>{props.pageMode.id} + {props.pageMode.moduleId}</div>
  );
}
