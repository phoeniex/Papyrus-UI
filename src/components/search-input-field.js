import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchRounded from '@material-ui/icons/SearchRounded';
import CloseRounded from '@material-ui/icons/CloseRounded';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 260,
    padding: '2px 4px 2px 8px',
  },
  svgIcon: {
    color: '#909090',
  },
  input: {
    margin: '0 8px',
    fontSize: 12,
    flex: 1,
  },
});

export default function SearchInputField() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <SearchRounded className={classes.svgIcon} fontSize='small' />
      <InputBase
        className={classes.input}
        placeholder='Search For Screen or String'
      />
      <IconButton
        className={classes.iconButton}
        size='small'
        disableFocusRipple='true'
        disableRipple='true'
        aria-label='Clear'>
        <CloseRounded className={classes.svgIcon} fontSize='small' />
      </IconButton>
    </Paper>
  );
}
