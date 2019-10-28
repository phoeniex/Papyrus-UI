import React from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    float: 'left',
    margin: 16,
  },
  newScreenItem: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  newScreenText: {
    fontSize: 12,
    fontWeight: 300,
    color: 'rgba(47, 47, 47, 0.6)',
    textTransform: 'none',
  },
  screenImageItem: {
    padding: 0,
  },
  screenImageButton: {
    padding: 0,
  },
  screenImage: {
    cursor: 'pointer',
    width: 206,
    height: 368,
  },
  newScreenImage: {
    width: 42,
    height: 42,
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
  const isAddNewScreen = props.addNewScreen
  const screenImage = props.image || require('./../images/background-screen-default.png')
  const screenImage2x = props.image || require('./../images/background-screen-default@2x.png')

  const handleScreenClick = (event) => {
    console.log('Link To Screen of Module: ' + props.moduleId)
    props.setPageMode({mode: 'screen', id: isAddNewScreen ? props.screenCount : props.screenId, moduleId: props.moduleId})
  }

  function ScreenDetail() {
    if(!isAddNewScreen) {
      return <span className={classes.screenDetailItem}>
        <Typography className={classes.screenName}>{props.name}</Typography>
        <Typography className={classes.screenDetail}>{props.localizedCount} words</Typography>
      </span>
    }

    return null
  }

  function NewScreen() {
    const newScreenIcon = require('./../images/icon-add-new-screen@2x.png')
    const newScreenIcon2x = require('./../images/icon-add-new-screen@2x.png')

    if (isAddNewScreen) {
      return <span className={classes.newScreenItem}>
        <img src={newScreenIcon} srcSet={newScreenIcon2x + ' 2x'} alt='New Screen'/>
        <Typography className={classes.newScreenText}>Add New Screen</Typography>
      </span>
    }

    return null
  }

  return (
    <Box className={classes.root}>
      <Paper elevation={props.addNewScreen ? 0 : 3} className={classes.screenImageItem}>
        <Button className={classes.screenImageButton} onClick={handleScreenClick}>
          <img className={classes.screenImage} src={screenImage} srcSet={screenImage2x + ' 2x'} alt='Screen'/>
          <NewScreen className={classes.newScreenImage}/>
        </Button>
      </Paper>
      <ScreenDetail/>
    </Box>
  );
}
