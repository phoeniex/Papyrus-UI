import React from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    float: 'left',
    margin: 16,
  },
  screenImageItem: {
    padding: 0,
  },
  screenImageButton: {
    padding: 0,
  },
  screenImage: {
    cursor: 'pointer',
  },
  screenDetailItem: {
    display: 'flex',
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  screenName: {
    fontSize: 12,
    fontWeight: 500,
    color: '#2F2F2F',
  },
  screenDetail: {
    fontSize: 8,
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'rgba(47, 47, 47, 0.6)',
  },
}));

export const ScreenCard = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper className={classes.screenImageItem}>
        <Link to='/screen/test'>
          <Button className={classes.screenImageButton}><img className={classes.screenImage} src={require('./../images/sample.png')} alt='Edit'/></Button>
        </Link>
      </Paper>
      <span className={classes.screenDetailItem}>
        <Typography className={classes.screenName}>{props.name}</Typography>
        <Typography className={classes.screenDetail}>{props.localizedCount} words</Typography>
      </span>
    </Box>
  );
}
