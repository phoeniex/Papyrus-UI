import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ScreenCard } from '../components/screen-card';

const useStyles = makeStyles(theme => ({
  root: {
    top: 128,
    left: 0,
    bottom: 0,
    position: 'absolute',
    overflow: 'auto',
    width: '100%',
    backgroundColor: '#FCFCFC',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      id={`simple-modulepanel-${index}`}
      aria-labelledby={`simple-modulepanel-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const ModuleContainer = (props) => {
  const classes = useStyles();
  const moduleId = props.moduleId || 0
console.log('moduleId' + moduleId)
  return (
    <React.Fragment>
      <TabPanel className={classes.root} value={moduleId} index={0}>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
      </TabPanel>
      <TabPanel className={classes.root} value={moduleId} index={1}>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
        <ScreenCard/>
      </TabPanel>
      <TabPanel className={classes.root} value={moduleId} index={2}>
      </TabPanel>
    </React.Fragment>
  );
}


